import Expo, { SQLite } from 'expo';
import R from 'ramda'

const db = SQLite.openDatabase('db.db');

export const createDb = () => {
    db.transaction(tx => {
        tx.executeSql(
            'create table if not exists items (id integer primary key not null, contract int, type text, network real, drain real, equip real, date text);'
        );
    });
};

export const insertData = data => {
    db.transaction(tx => {
        tx.executeSql('delete from items');
        data.forEach(row => {
            tx.executeSql(
                'insert into items (contract, type, network, drain, equip, date) values (?, ?, ?, ?, ?, ?)', [row.contract, row.type, row.network, row.drain, row.equip, row.date]);
        });
    });
};

// Areas Data
export const createAreaDb = () => {
    db.transaction(tx => {
        tx.executeSql(
            'create table areas (id integer primary key not null, name text not null);'
        );
    });
};

export const insertAreaData = data => {
    db.transaction(tx => {
        tx.executeSql('delete from areas');
        data.forEach(row => {
            tx.executeSql(
                'insert into areas (id, name) values (?, ?)',
                [row.id, row.name]
            );
        });
    });
};

// Contracts Data
export const createContractDb = () => {
    db.transaction(tx => {
        tx.executeSql(
            'create table contracts (id integer primary key not null, areaId int, name text);'
        );
    });
};

export const insertContractData = data => {
    db.transaction(tx => {
        tx.executeSql('delete from contracts');
        data.forEach(row => {
            tx.executeSql(
                'insert into contracts (id, areaId, name) values (?, ?, ?)', [row.id, row.areaId, row.name]);
        });
    });
};

// Periods Data
export const createPeriodDb = () => {
    db.transaction(tx => {
        tx.executeSql(
            'create table periods (id integer primary key not null, name text, startTime text, endTime text);'
        );
    });
};

export const insertPeriodData = data => {
    db.transaction(tx => {
        tx.executeSql('delete from periods');
        data.forEach(row => {
            tx.executeSql(
                'insert into periods (name, startTime, endTime) values (?, ?, ?)', [row.name, row.startTime, row.endTime]);
        });
    });
};

// Menu Data
// export const createMenuDb = () => {
//     db.transaction(tx => {
//         tx.executeSql(
//             'create table if not exists menues (id integer primary key not null, name text, startTime text, endTime text);'
//         );
//     });
// };

// export const insertMenuData = data => {
//     db.transaction(tx => {
//         tx.executeSql('delete from periods');
//         data.forEach(row => {
//             tx.executeSql(
//                 'insert into periods (name, startTime, endTime) values (?, ?, ?)', [row.name, row.startTime, row.endTime]);
//         });
//     });
// };
