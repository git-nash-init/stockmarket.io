<?php
/**
 * PHP Routing Fallback for StockMarket.io
 * This file handles SPA routing when .htaccess is not working
 * 
 * How it works:
 * 1. If a file doesn't exist, serve index.html
 * 2. Let React Router handle client-side routing
 */

// Get the requested path
$request_uri = $_SERVER['REQUEST_URI'];
$parsed_url = parse_url($request_uri);
$path = $parsed_url['path'];

// Remove leading slash
$path = ltrim($path, '/');

// Define file extensions to serve directly (static assets)
$static_extensions = ['js', 'css', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'ico', 'woff', 'woff2', 'ttf', 'json', 'xml'];

// Get file extension
$extension = pathinfo($path, PATHINFO_EXTENSION);

// If it's a static file and exists, serve it directly
if (in_array($extension, $static_extensions) && file_exists($path)) {
    // Set appropriate content type
    $content_types = [
        'js' => 'application/javascript',
        'css' => 'text/css',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'svg' => 'image/svg+xml',
        'ico' => 'image/x-icon',
        'woff' => 'font/woff',
        'woff2' => 'font/woff2',
        'ttf' => 'font/ttf',
        'json' => 'application/json',
        'xml' => 'text/xml'
    ];
    
    if (isset($content_types[$extension])) {
        header('Content-Type: ' . $content_types[$extension]);
    }
    
    // Serve the file
    readfile($path);
    exit;
}

// If it's not a static file or doesn't exist, serve index.html
// This allows React Router to handle the routing

// Check if index.html exists
if (file_exists('index.html')) {
    // Set HTML content type
    header('Content-Type: text/html; charset=utf-8');
    
    // Serve index.html
    readfile('index.html');
} else {
    // Fallback error message
    header('HTTP/1.1 404 Not Found');
    header('Content-Type: text/html; charset=utf-8');
    echo '<!DOCTYPE html>
<html>
<head>
    <title>404 - StockMarket.io</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
        .error { color: #e74c3c; }
        .info { color: #3498db; margin-top: 20px; }
    </style>
</head>
<body>
    <h1 class="error">404 - Page Not Found</h1>
    <p>The file index.html is missing. Please upload your React build files.</p>
    <p class="info">You tried to access: ' . htmlspecialchars($request_uri) . '</p>
    <p><a href="/">Go Home</a></p>
</body>
</html>';
}
?>