My group has updated Strapi to one of the latest version that allows import, export and all the other functions that you may find useful running "npm run strapi help".


Our group's work on Strapi backend is located at backend-strapi -> export_20231209172031.tar.gz.enc. in an encrypted file. 

The encrption code is 12345678

IMPORT:
Inorder to import this file onto your own local strapi: 
use this command: npm run strapi import -- -f export_20221213105643.tar.gz.enc --key my-encryption-key
Replace export_20221213105643.tar.gz.enc with our file and my-encryption-key with our code. 
You can find more information of Import on https://docs.strapi.io/dev-docs/data-management/import 

EXPORT:
Inorder to export your strapi backend:
use this command: npm run strapi export -- --key my-encryption-key
Replace my-encryption-key with an encrption key of your choice. For security purposes this is encryption key is important. 
You can find more information on export on: https://docs.strapi.io/dev-docs/data-management/export 
