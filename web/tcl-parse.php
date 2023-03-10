<?php

$config = require 'config.prod.php';

class GoogleSheet {
    private $endpoint = "https://sheets.googleapis.com/v4/spreadsheets/%s/values/%s";
    private $config;

    public function __construct($config) {
        $this->config = $config;
    }

    public function getSheet() {
        $response = $this->call("1E_PS8Hl3rPCya-iU6DKGHC5L5-l44MhYoUICejqpRKA", "B:F");

        $players = [];
        if($response && is_array($response->values)) {
            foreach ($response->values as $k => $row) {
                if($k >= 4) {
                    $players[] = ['username' => $row[0], 'mmr' => $row[4], 'positions' => $row[3]];
                }
            }
        }

        file_put_contents(__DIR__ . '/tcl.json', json_encode($players));
    }

    private function call($sheetId, $range) {
        $url = sprintf($this->endpoint, $sheetId, $range);

        $h = curl_init();
        curl_setopt($h, CURLOPT_URL, $url);
        curl_setopt($h, CURLOPT_RETURNTRANSFER, true);
        //curl_setopt($h, CURLOPT_FAILONERROR, true);
        curl_setopt($h, CURLOPT_TIMEOUT, 1);
        curl_setopt($h, CURLOPT_HTTPHEADER, [
            'X-goog-api-key: ' . $this->config['googleApiKey'],
            'Content-Type: application/json; charset=utf-8'
        ]);

        $result = curl_exec($h);

        $res = json_decode($result);

        if (!$res) {
            throw new Exception('can not fetch');
        }

        return $res;
    }
}

$sheet = New GoogleSheet($config);
$sheet->getSheet();

