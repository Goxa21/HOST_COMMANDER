const { Pool } = require('pg');

class AMBASSADOR{
    constructor(){
        this.pool = new Pool({
            user: 'user',
            database: 'database',
            password: 'password',
            port: 5432,
            host: 'hostname',
        });

    }
    async launchQuery(request) {
        console.log('--COMMUNICATE WITH DB--');
        console.log(request);
        try {
            const responce = await this.pool.query(request);
            //console.log(responce.rows[0]);
            return { status: "success", responce: responce };
        } catch (error) {
            //console.log(error);
            return { status: "error", error: error };
        }
    }
}

module.exports = new AMBASSADOR();
