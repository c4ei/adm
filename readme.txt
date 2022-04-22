readme.txt
yarn add dotenv

/home/dev/www/adm/app.js
smtp.gmail.com


const dotenv = require('dotenv');
dotenv.config();

process.env.

process.env.SERVER_IP
process.env.SiteUrl

yarn add sequelize
yarn add global sequelize-cli


CREATE TABLE IF NOT EXISTS `membership_transactions` 
(`id` INTEGER auto_increment , `user_id` INTEGER, `transaction_id` VARCHAR(255), `subscription_id` VARCHAR(255), `total_transactions` INTEGER, 
`plan_title` VARCHAR(255), `user_name` VARCHAR(255), `amount` INTEGER, `status` VARCHAR(255), `days` INTEGER, 
PRIMARY KEY (`id`)
-- , FOREIGN KEY (`subscription_id`) REFERENCES `subscription` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
