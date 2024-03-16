Our group is using the imbedded Import/ Export functionality from Strapi 

Information on Export: https://docs.strapi.io/dev-docs/data-management/export 
Information on Import: https://docs.strapi.io/dev-docs/data-management/import

Encryption key to out file: 12345678
Our work is located in the /backend-strapi/export_20.... file. Inorder to see our work on your local Strapi, You would need to go into ./backend-strapi. Make sure you Strapi is running at this time. 

Then use the Import command (also found in the link)

npm run strapi import -- -f export_20221213105643.tar.gz.enc --key my-encryption-key

replace the my-encryption-key with our key and the export_20221213105643.tar.gz.enc file with our file in backend-strapi

