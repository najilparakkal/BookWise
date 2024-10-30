const { Client } = require('@elastic/elasticsearch');
export const esClient = new Client({ 
    node: 'https://d45e683c5ac64e179758ba5a462776b1.us-central1.gcp.cloud.es.io:443',
    auth: { 
        username: 'elastic', 
        password: 'L8TgQnORqgZDqIyoqEDgmOQu' 
    }
});
