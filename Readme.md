### Monoland Framework

monoland framework adalah penggabungan antara laravel framework dengan vuejs + vuetify.

cara install:
```
    composer create-project monoland/monoland [your-project-name]
```

edit .env file, bila ingin mengganti default user dan password, silahkan edit UsersTableSeeder di database->seeds dan setelah itu
```
    php artisan migrate:refresh --seed
```