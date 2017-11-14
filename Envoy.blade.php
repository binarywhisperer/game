@servers(['production' => 'root@108.61.203.135'])

@task('status', ['on' => ['production']])
cd /var/www/html/tournamentofwinners
git fetch
git status
@endtask

@task('list', ['on' => ['production']])
ls -la
@endtask

@task('deploy', ['on' => ['production']])
cd /var/www/html/tournamentofwinners
git stash
git pull
git status
sudo chmod -R 775 storage
sudo chown -R www-data storage
composer dump-autoload
php artisan cache:clear
@endtask

@task('init', ['on' => ['production']])
git clone git@bitbucket.org:BryceBryce/nerfstone.git
cd tournamentofwinners
cp .env.example .env
composer install
php artisan key:generate
sudo chmod -R 775 storage
sudo chown -R www-data storage
php artisan vendor:publish
php artisan cache:clear
@endtask

@task('migrate', ['on' => ['production']])
cd /var/www/html/tournamentofwinners
php artisan migrate
@endtask