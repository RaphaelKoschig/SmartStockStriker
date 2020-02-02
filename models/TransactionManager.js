import * as SQLite from 'expo-sqlite'


export class TransactionManager {
    constructor() {
        this.DB = SQLite.openDatabase("database.db");
        this.DB.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY NOT NULL, user_id INTEGER, symbol TEXT, shares INTEGER, price NUMERIC, datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP);', [], (_, { result }) => {
            }, (t, error) => {
                console.log(error);
            }
            )
        })
    }

    buyShares(number, price, symbol, userId, callback) {
        try {
            this.DB.transaction(tx => {
                tx.executeSql("SELECT cash FROM users WHERE id = ?;", [userId], (_, { rows }) => {
                    var user = rows.item(0);
                    var usercash = user.cash
                    var totalPrice = (number * price)
                    if (usercash >= totalPrice) {
                        usercash -= totalPrice
                        tx.executeSql("UPDATE users SET cash = ? WHERE id = ?;", [usercash, userId], (_, { result }) => {
                            console.log(result)
                            tx.executeSql('INSERT INTO transactions (user_id, symbol, shares, price) VALUES (?, ?, ?, ?);', [userId, symbol, number, totalPrice], (_, { result }) => {
                                callback(result)
                                alert('Achat effectué !')
                            }, (t, error) => {
                                console.log(error);
                            })
                        }, (t, error) => {
                            console.log(error);
                        })
                    }
                    else {
                        alert('Vous n\avez pas assez de cash')
                    }
                }, (t, error) => {
                    console.log(error);
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    sellShares(number, price, symbol, userId) {
        try {
            this.DB.transaction(tx => {
                tx.executeSql("SELECT cash FROM users WHERE id = ?;", [userId], (_, { rows }) => {
                    var user = rows.item(0);
                    var usercash = user.cash
                    tx.executeSql("SELECT shares FROM transactions WHERE user_id = ? AND symbol = ?;", [userId, symbol], (_, { result }) => {
                        console.log(result)
                        //var quote = result.item(0);
                        /*
                        var quoteShares = quote.totalshares
                        if (number >= quoteShares) {
                            var totalPrice = (number * price)
                            usercash += totalPrice
                            tx.executeSql("UPDATE users SET cash = ? WHERE id = ?;", [usercash, userId], (_, { result }) => {
                                console.log(result)
                                tx.executeSql('INSERT INTO transactions (user_id, symbol, shares, price) VALUES (?, ?, ?, ?);', [userId, symbol, -(number), totalPrice], (_, { result }) => {
                                    console.log(result)
                                    alert('Vente effectuée !')
                                }, (t, error) => {
                                    console.log(error);
                                })
                            }, (t, error) => {
                                console.log(error);
                            })
                        } 
                        else {
                            alert('Vous n\avez pas assez d\'actions de cette entreprise !')
                        }
                        */

                    })
                }, (t, error) => {
                    console.log(error);
                })
            })
        } catch (error) {
            console.log(error)
        }
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