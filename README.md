# REBEL Fitness — Web Aplikacija za Praćenje Treninga

Ovaj projekat predstavlja **full-stack fitness aplikaciju** za praćenje treninga, vežbi i ciljeva.  
Napravljen je kao kombinacija **Laravel** (backend API) i **React** (frontend) tehnologija.

---

## Pokretanje projekta na lokalnoj mašini

### (1) Backend (Laravel API)

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
# Pokreni migracije i seedere:
php artisan migrate --seed
```
### Pokretanje factory-a i dodatnih seeding podataka (opciono):

# Ako želiš da ponovo napuniš bazu test podacima:
php artisan migrate:fresh --seed

Seeder automatski kreira:

- jednog admin korisnika
- jednog member korisnika
- nekoliko test treninga i vežbi (povezanih sa njima)

Nakon toga pokreni server:
php artisan serve

**Server se pokreće na http://127.0.0.1:8000**

### (2) Frontend (React)

cd .\internet-tehnologije-2024-projekat-fitnesswebapp_20210129_20210288\Domaci2\fitness-frontend\

# Instalacija dependencija
npm install

# Pokretanje u dev režimu
npm run dev

**Frontend se pokreće na http://localhost:5173**

### Opis funkcionalnosti

Aplikacija omogućava upravljanje korisnicima, treninzima i vežbama, sa različitim nivoima pristupa:

1. Gost (guest)

Može da se uloguje kao gost (bez registracije)

Vidi sve javne treninge (/workouts)

Vidi detalje treninga, ali ne može da ih menja ili briše

2. Član (member)

Može da kreira nalog i loguje se

Može da:

Kreira svoje treninge

Uređuje i briše sopstvene treninge

Dodaje vežbe u okviru svojih treninga

Filtrira treninge i vežbe po tipu i ključnim rečima

Vidi i javne treninge (read-only)

3. Administrator (admin)

Ima sve funkcionalnosti člana

Dodatno može:

Da vidi i briše bilo kog korisnika

Upravljа ciljevima (Goals)

Vidi i uređuje sve treninge

### Tehnologije
(1) - Backend

Laravel 11 (PHP)

Sanctum — autentifikacija preko tokena

Eloquent ORM

MySQL

(2) - Frontend

React + Vite

React Router DOM

Context API za autentifikaciju

Tailwind CSS
