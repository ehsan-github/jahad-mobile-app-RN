import Expo, { SQLite } from 'expo';
import R from 'ramda'

const db = SQLite.openDatabase('db.db');

export const createDataDb = () => {
    db.transaction(tx => {
        tx.executeSql(
            'create table items (id integer primary key not null, contract int, type text, network real, drain real, equip real, date text);'
        );
    });
};

export const insertData = data => {
    db.transaction(tx => {
        tx.executeSql('delete from items');
        if (data.length > 0){
            data.forEach(row => {
                tx.executeSql(
                    'insert into items (contract, type, network, drain, equip, date) values (?, ?, ?, ?, ?, ?)', [row.ContractID, row.Type, row.Network, row.Drainage, row.Equipped, row.CreateDate]);
            });
        }
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
        // console.warn('hre', data)
        if (data.length > 0){
            data.forEach(row => {
                tx.executeSql(
                    'insert into areas (id, name) values (?, ?)',
                    [row.id, row.name]
                );
            });
        }
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
        if (data.length > 0){
            data.forEach(row => {
                tx.executeSql(
                    'insert into contracts (id, areaId, name) values (?, ?, ?)', [row.id, row.areaId, row.name]);
            });
        }
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
        if (data.length > 0){
            data.forEach(row => {
                tx.executeSql(
                    'insert into periods (id, name, startTime, endTime) values (?, ?, ?, ?)', [row.id, row.name, row.startDate, row.endDate]);
            });
        }
    });
};

export const createTypeDb = () => {
    db.transaction(tx => {
        tx.executeSql(
            'create table types (id integer primary key not null, name text);'
        );
    });
};

export const insertTypeData = data => {
    db.transaction(tx => {
        tx.executeSql('delete from types');
        if (data.length > 0){
            data.forEach(row => {
                tx.executeSql(
                    'insert into types (id, name) values (?, ?)', [row.id, row.name]);
            });
        }
    });
};

export const createArzeshYabiDataDb = () => {
    db.transaction(tx => {
        tx.executeSql(
            'create table arzeshyabi (id integer primary key not null, contract int, period int, score int, status text, type int);'
        );
    });
};

export const insertArzeshYabiData = data => {
    db.transaction(tx => {
        tx.executeSql('delete from arzeshyabi');
        if (data.length > 0){
            data.forEach(row => {
                tx.executeSql(
                    'insert into arzeshyabi (contract, period, score, status, type) values (?, ?, ?, ?, ?)', [row.contractID, row.periodId, row.score, row.status, row.typeId]);
            });
        }
    });
};
