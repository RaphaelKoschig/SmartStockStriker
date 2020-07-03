// Première version avec SQLITE

import * as SQLite from 'expo-sqlite';

export class DatabaseManager {
    constructor() {
        this.DB = SQLite.openDatabase("database.db");
        this.DB.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, name TEXT, email TEXT, password TEXT, cash NUMERIC DEFAULT 10000);', [], (_, { result }) => {
            }, (t, error) => {
                console.log(error);
            }
            )
        })
        this.DB.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY NOT NULL, user_id INTEGER, symbol TEXT, shares INTEGER, price NUMERIC, datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP);', [], (_, { result }) => {
            }, (t, error) => {
                console.log(error);
            }
            )
        })
    }

    dropTransactions() {
        this.DB.transaction(tx => {
            tx.executeSql('DROP TABLE transactions;', [], (_, { result }) => {
            }, (t, error) => {
                console.log(error);
            }
            )
        })
    }
}