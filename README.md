Cara install 

#### 1. clone project
  * $ git clone git@github.com:tekdungtralala/makarizo.git
  * $ cd makarizo

#### 2. buat folder platforms
  * $ mkdir platforms

#### 3. tambahkan platform android
  * $ cordova platform add android

#### 4. tambahkan beberapa plugins
  * $ cordova plugin add cordova-plugin-whitelist
  * $ cordova plugin add org.apache.cordova.statusbar 

#### 5. coba tambilkan di browser
  * $ ionic serve --lab

#### 6. jalankan di android
  * Note : pastikan device sudah terhubung ke komputer 
  * $ ionic run android
