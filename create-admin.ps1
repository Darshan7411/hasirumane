# Create Admin User Script
# Run this after starting the backend server

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Create Admin User for HASIRUMANE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$serverUrl = "http://localhost:5000"

# Test if server is running
Write-Host "Checking if server is running..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$serverUrl/api/health" -Method GET -ErrorAction Stop
    Write-Host "[OK] Server is running" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Server is not running. Please start the server first:" -ForegroundColor Red
    Write-Host "  cd server" -ForegroundColor Yellow
    Write-Host "  npm run dev" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Creating admin user..." -ForegroundColor Yellow
Write-Host ""

$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    username = "admin"
    email = "admin@hasirumane.com"
    password = "admin123"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "$serverUrl/api/auth/create-admin" -Method POST -Headers $headers -Body $body -ErrorAction Stop
    $result = $response.Content | ConvertFrom-Json
    
    Write-Host "[SUCCESS] Admin user created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Login Credentials:" -ForegroundColor Yellow
    Write-Host "Email:    admin@hasirumane.com" -ForegroundColor Cyan
    Write-Host "Password: admin123" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "[WARNING] IMPORTANT: Change these credentials after first login!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Access admin panel at:" -ForegroundColor Yellow
    Write-Host "http://localhost:3000/admin/login" -ForegroundColor Cyan
    Write-Host ""
} catch {
    $errorResponse = $_.Exception.Response
    if ($errorResponse) {
        $reader = New-Object System.IO.StreamReader($errorResponse.GetResponseStream())
        $errorContent = $reader.ReadToEnd() | ConvertFrom-Json
        
        if ($errorContent.message -like "*already exists*") {
            Write-Host "[INFO] Admin user already exists!" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "Login Credentials:" -ForegroundColor Yellow
            Write-Host "Email:    admin@hasirumane.com" -ForegroundColor Cyan
            Write-Host "Password: admin123" -ForegroundColor Cyan
            Write-Host ""
        } else {
            Write-Host "[ERROR] $($errorContent.message)" -ForegroundColor Red
        }
    } else {
        Write-Host "[ERROR] Failed to create admin user" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}
