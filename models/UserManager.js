// Première version avec SQLITE

import * as SQLite from 'expo-sqlite';
import Toast from 'react-native-simple-toast';


export class UserManager {
    constructor() {
        this.DB = SQLite.openDatabase("database.db");
    }

    connectUser(checkEmail, checkPassword, callback) {
        try {
            this.DB.transaction(tx => {
                tx.executeSql("SELECT * FROM users WHERE email = ?;", [checkEmail], (_, { rows }) => {
                    var user = rows.item(0);
                    console.log(user)
                    if (user != undefined) {
                        if (checkPassword == user.password) {
                            callback(user)
                        }
                        else {
                            Toast.show('Mot de passe incorrect !')
                        }
                    }
                    else {
                        Toast.show('Adresse mail invalide !')
                    }

                }, (t, error) => {
                    console.log(error);
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    addUser(name, email, password, callback) {
        try {
            this.DB.transaction(tx => {
                tx.executeSql("SELECT email FROM users WHERE email = ?;", [email], (_, { rows }) => {
                    console.log('Mail already in database : ')
                    console.log(rows.item(0))
                    if (rows.item(0) == undefined) {
                        this.DB.transaction(tx => {
                            tx.executeSql('INSERT INTO users (name, email, password) VALUES (?, ?, ?);', [name, email, password], (_, { result }) => {
                                console.log('Insert success ! ')
                                console.log(result)
                                tx.executeSql("SELECT * FROM users WHERE email = ?;", [email], (_, { rows }) => {
                                    console.log('User registered : ')
                                    console.log(rows.item(0))
                                    var user = rows.item(0);
                                    callback(user)
                                })
                            }, (t, error) => {
                                console.log(error);
                                Toast.show('Une erreur est survenue dans votre inscription, veuillez réessayer.')
                            })
                        })
                    }
                    else {
                        Toast.show('Email déjà pris !')
                    }
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    getUserId(email, callback) {
        try {
            this.DB.transaction(tx => {
                tx.executeSql("SELECT id FROM users WHERE email = ?;", [email], (_, { rows }) => {
                    var user = rows.item(0);
                    //console.log(user)
                    var userId = user.id
                    //console.log(userId)
                    callback(userId)

                }, (t, error) => {
                    console.log(error);
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    getUserCash(email, callback) {
        try {
            this.DB.transaction(tx => {
                tx.executeSql("SELECT cash FROM users WHERE email = ?;", [email], (_, { rows }) => {
                    var user = rows.item(0);
                    var usercash = user.cash
                    //console.log(usercash)
                    callback(usercash)

                }, (t, error) => {
                    console.log(error);
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    getUserTransactions(userId, callback) {
        try {
            this.DB.transaction(tx => {
                tx.executeSql("SELECT * FROM transactions WHERE user_id = ?;", [userId], (_, { rows }) => {
                    var userTransactions = rows._array;
                    console.log('transactions : ')
                    console.log(userTransactions)
                    callback(userTransactions)
                }, (t, error) => {
                    console.log(error);
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    getUserTransactionsGroup(userId, callback) {
        try {
            this.DB.transaction(tx => {
                tx.executeSql("SELECT symbol, SUM(price) AS totalprice, SUM(shares) AS totalshares, user_id FROM transactions WHERE user_id = ? GROUP BY symbol;", [userId], (_, { rows }) => {
                    var userTransactionsGroup = rows._array;
                    console.log('transactions : ')
                    console.log(userTransactionsGroup)
                    console.log('--------------------------------')
                    callback(userTransactionsGroup)
                }, (t, error) => {
                    console.log(error);
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    getUserTotalSharesValue(userId, callback){
        try {
            this.DB.transaction(tx => {
                tx.executeSql("SELECT SUM(price) AS totalsharesvalue FROM transactions WHERE user_id = ?;", [userId], (_, { rows }) => {
                    var user = rows.item(0);
                    var totalsharesvalue = user.totalsharesvalue
                    //console.log(usercash)
                    callback(totalsharesvalue)

                }, (t, error) => {
                    console.log(error);
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
}