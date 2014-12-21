<?php

$currentProjects = array(
    //'example',

    'xerces-c',
    //'xmltooling',
    'xmlsecurity',
    //'opensaml',
    'shibboleth',
    'shibboleth-full',

    'shibboleth2',
    'shibboleth3',
    'shibboleth4',
);

$aggregateMap = array(
    'shibboleth' => array('shibboleth-full', 'shibboleth2', 'shibboleth3', 'shibboleth4'),
    'shibboleth2' => array('shibboleth-full', 'shibboleth', 'shibboleth3', 'shibboleth4'),
    'shibboleth3' => array('shibboleth-full', 'shibboleth', 'shibboleth2', 'shibboleth4'),
    'shibboleth4' => array('shibboleth-full', 'shibboleth', 'shibboleth2', 'shibboleth3'),
    'shibboleth-full' => array('shibboleth'),
);

$acceptNewSessionIds = true;

$baselineFolder = __DIR__ . '/baseline';
$dataFolder = __DIR__ . '/data';

$baseUrl = 'https://www.distributed-fuzzing.nl/api/v1';

$projectSubmitTargets = array(
    'session' => array(
        'folder' => 'sessions',
        'can_download' => false,
        'aggregate' => false,
        'allow_overwrite' => true,
        'allow_duplicates' => true,
    ),

    'queue' => array(
        'folder' => 'queue',
        'can_download' => true,
        'aggregate' => true,
        'allow_overwrite' => false,
        'allow_duplicates' => false,
    ),
    'hang' => array(
        'folder' => 'hangs',
        'can_download' => false,
        'aggregate' => false,
        'allow_overwrite' => false,
        'allow_duplicates' => false,
    ),
    'crash' => array(
        'folder' => 'crashes',
        'can_download' => false,
        'aggregate' => false,
        'allow_overwrite' => false,
        'allow_duplicates' => false,
    )
);