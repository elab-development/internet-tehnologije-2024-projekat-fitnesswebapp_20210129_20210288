# REBEL Fitness — Web Aplikacija za Praćenje Treninga

Ovaj projekat predstavlja **full-stack fitness aplikaciju** za praćenje treninga, vežbi i ciljeva.  
Napravljen je kao kombinacija **Laravel** (backend API) i **React** (frontend) tehnologija.

---

## Pokretanje projekta na lokalnoj mašini

### Backend (Laravel API)

#### Zahtevi
- PHP ≥ 8.2  
- Composer  
- MySQL / MariaDB  

#### Instalacija i pokretanje
```bash
cd .\internet-tehnologije-2024-projekat-fitnesswebapp_20210129_20210288\Domaci1\fitness-web-app\

# Instalacija dependencija
composer install

# Kreiraj .env fajl
cp .env.example .env

# Generiši app key
php artisan key:generate

# Podesi bazu u .env (DB_DATABASE, DB_USERNAME, DB_PASSWORD)!
# pa pokreni migracije:
php artisan migrate --seed

# Pokreni server
php artisan serve
```

Server se pokreće na **http://127.0.0.1:8000**

### Frontend (React)

cd .\internet-tehnologije-2024-projekat-fitnesswebapp_20210129_20210288\Domaci2\fitness-frontend\

# Instalacija dependencija
npm install

# Pokretanje u dev režimu
npm run dev

Frontend se pokreće na **http://localhost:5173**

### Opis funkcionalnosti

Aplikacija omogućava upravljanje korisnicima, treninzima i vežbama, sa različitim nivoima pristupa:

1. Gost (guest)

može da se uloguje kao gost (bez registracije)

vidi sve javne treninge (/workouts)

vidi detalje treninga, ali ne može da ih menja ili briše

2. Član (member)

može da kreira nalog i loguje se

može da:

kreira svoje treninge

uređuje i briše sopstvene treninge

dodaje vežbe u okviru treninga

filtrira sopstvene treninge i vežbe

vidi i javne treninge (read-only)

3. Administrator (admin)

ima sve funkcionalnosti člana

dodatno može:

da vidi i briše bilo kog korisnika

upravlja ciljevima (Goals)

vidi i uređuje sve treninge

### Tehnologije
Backend

Laravel 11 (PHP)

Sanctum — autentifikacija preko tokena

Eloquent ORM

MySQL

Frontend

React + Vite

React Router DOM

Context API za autentifikaciju

Tailwind CSS
