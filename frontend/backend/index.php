
<?php

function startSession() {
    session_start();
}

function getSessionData($key) {
    return isset($_SESSION[$key]) ? $_SESSION[$key] : null;
}

function setSessionData($key, $value) {
    $_SESSION[$key] = $value;
}

function destroySession() {
    session_destroy();
}

?>