<?php
    $jsonUrl = $_GET['d'];

    $contextOptions = [
        "ssl" => [
            "verify_peer" => false,
            "verify_peer_name" => false,
        ]
    ];

    if(substr($jsonUrl, 0, 4) === "http" && substr($jsonUrl, -5) == ".json") {
        $jsonData = preg_replace("#https://faceit.deadsec.net/#", "", $jsonUrl);
        $content = json_decode(file_get_contents($jsonData, false, stream_context_create($contextOptions)));
        if(is_array($content)) {
            include 'faceitdota.web.js';
            echo sprintf('FaceItDota.setData(%s);', json_encode($content));
            echo sprintf('FaceItDota.init();');
        } else {
            echo sprintf('alert("%s source invalid json data");');
        }

    } else {
        echo sprintf('alert("%s is not a valid data source");', $jsonData);
    }
?>