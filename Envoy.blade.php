@servers(['production' => 'root@45.76.253.75'])

@task('status', ['on' => ['production']])
    cd /var/www/game
    git fetch
    git status
@endtask

@task('deploy', ['on' => ['production']])
    cd /var/www/game
    git pull
    git checkout TicTacToe
    git status
    sudo chmod -R 775 storage
    sudo chown -R www-data storage
    composer dump-autoload
    php artisan cache:clear
@endtask

@task('migrate', ['on' => ['production']])
    cd /var/www/game
    php artisan migrate
@endtask

@task('migrate-refresh', ['on' => ['production']])
    cd /var/www/game
    php artisan migrate:refresh
    php artisan db:seed
@endtask