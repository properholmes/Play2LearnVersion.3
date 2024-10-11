<?php

// start a new session or resume an existing session
function startSession() {
    session_start(); // initialize session management
}

// retrieve session data for a given key
function getSessionData($key) {
    // check if the session key exists, return its value or null
    return isset($_SESSION[$key]) ? $_SESSION[$key] : null;
}

// set session data for a given key with a specified value
function setSessionData($key, $value) {
    $_SESSION[$key] = $value; // store the value in the session
}

// destroy the current session, clearing all session data
function destroySession() {
    session_destroy(); // end the session
}

?>
