"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.esClient = void 0;
const { Client } = require('@elastic/elasticsearch');
exports.esClient = new Client({
    node: 'https://d45e683c5ac64e179758ba5a462776b1.us-central1.gcp.cloud.es.io:443',
    auth: {
        username: 'elastic',
        password: 'L8TgQnORqgZDqIyoqEDgmOQu'
    }
});
