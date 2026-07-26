# Spletna stran — Svetlana, frizerski salon (Mariana Kondryn s.p.)

Statična spletna stran (HTML + CSS + JavaScript). Brez WordPressa, brez baze,
brez vzdrževanja. Datoteke enostavno naložite na strežnik in stran deluje.

---

## 1. Kaj je v mapi

```
spletna-stran/
├── index.html        Domov
├── o-meni.html       O meni
├── storitve.html     Storitve
├── kontakt.html      Kontakt in lokacija
├── css/style.css     Celotna tema (barve, tipografija, postavitev)
├── css/pisave.css    Lokalne pisave (@font-face) – neodvisno od Googla
├── js/main.js        Animacije in meni
├── pisave/           Datoteke pisav (Lato, Cormorant) z nabori za šumnike
├── slike/            Fotografije (glej slike/PREBERI-ME.txt)
└── NAVODILA.md       ta datoteka
```

Stran odprete tako, da dvokliknete `index.html`. Vse povezave med stranmi
so relativne, zato delujejo tako lokalno kot na strežniku.

---

## 2. Kaj je še TREBA dopolniti

| Kaj | Kje | Opomba |
|---|---|---|
| **Boljše fotografije** | mapa `slike/` | trenutne so začasne (nizka kvaliteta) – nove le shranite z istim imenom, glej `slike/PREBERI-ME.txt` |
| **Facebook, Telegram, TikTok** | v vseh 4 HTML datotekah | poiščite `href="#"` pri `class="socials"` in vstavite prave naslove |
| **Delovni čas** | noga vsake strani + `kontakt.html` | zdaj piše »po dogovoru« |
| **Cene** | `storitve.html` | zdaj piše »po dogovoru« |
| **Davčna in matična številka** | noga (neobvezno) | dodajte, če želite |
| **Besedila** | vse strani | napisana so kot predlog — Mariana naj jih pregleda in popravi po svoje |

> **Slike so že vstavljene** (začasne, nizke kvalitete). Ko dobite boljše,
> jih shranite z istimi imeni in prepišejo obstoječe. Slika striženja je
> trenutno `strizenje.gif` — če boste poslali `.jpg`, v `storitve.html`
> popravite `slike/strizenje.gif` v `slike/strizenje.jpg`.
>
> **Zemljevid** na strani Domov in Kontakt že kaže pravo lokacijo salona,
> gumb »Odpri v zemljevidu« pa vodi na vašo Google Maps povezavo.

### Kako vstavite povezavo do družbenega omrežja

Poiščite v datoteki (npr. `index.html`) vrstico:

```html
<a href="#" aria-label="Facebook" title="Facebook">
```

in `#` zamenjajte s pravim naslovom:

```html
<a href="https://www.facebook.com/imeprofila" target="_blank" rel="noopener" aria-label="Facebook" title="Facebook">
```

Enako za TikTok in Telegram. To ponovite v vseh štirih HTML datotekah
(povezave so v nogi, na strani `kontakt.html` pa še enkrat v kartici).

---

## 3. Barve

Vse barve so na enem mestu — na vrhu datoteke `css/style.css`, v bloku `:root`.
Če želite karkoli spremeniti, spremenite samo tam in velja za celotno stran.

| Spremenljivka | Barva | Kje se vidi |
|---|---|---|
| `--brand` | `#26867c` | osnovna barva salona: krog okoli besed, ikone, poudarki, pas s storitvami |
| `--brand-dark` | `#1e6e66` | gumbi (temnejša različica zaradi berljivosti belega besedila) |
| `--brand-deep` | `#123f3a` | temno zeleno ozadje pri pozivu »Rezervirajte termin« |
| `--brand-light` | `#5fb8ad` | povezave in nadnaslovi na temni podlagi |
| `--brand-pale` | `#a9dbd4` | drobni poudarki |
| `--sand` | `#dcc3a0` | topla peščena barva — pikice, poudarki (uravnoteži zeleno) |
| `--ink` | `#0f1e1c` | glavno temno ozadje (namesto črne — ima rahel zelen pridih) |
| `--ink-2` / `--ink-3` | `#142825` / `#1c3330` | izmenična temna ozadja in kartice |
| `--cream` / `--cream-2` | `#f7f4ef` / `#efeae1` | svetli odseki |

**Zakaj gumbi niso točno `#26867c`:** belo besedilo na `#26867c` doseže razmerje
kontrasta 4,4 : 1, kar je tik pod priporočilom za drobno besedilo (4,5 : 1).
Zato imajo gumbi malenkost temnejši odtenek iste barve (`#1e6e66`, razmerje 6,0 : 1),
povsod drugje — krogi okoli besed, ikone, obrobe, pas s storitvami, poudarki —
pa je uporabljena natanko želena barva `#26867c`.

**Izbrane spremljevalne barve:** topla peščena (`#dcc3a0`) in kremna (`#f7f4ef`)
zeleni dodata mehkobo, temna podlaga pa je namesto čiste črne zamaknjena
v zeleno (`#0f1e1c`) — tako je barva salona prisotna tudi v ozadju in oči
manj utrudi kot ostri kontrast črno-belo.

---

## 4. Tipografija

Enaka kot na predlogi:

- **Naslovi:** Cormorant (serif) — lahka teža, negativni razmik med črkami
- **Besedilo:** Lato — 16 px, višina vrstice 1,65
- **Nadnaslovi in gumbi:** Lato, velike črke, razmik med črkami 1,5–2,2 px

Pisave so **shranjene lokalno** v mapi `pisave/` in vključene prek
`css/pisave.css` — stran torej ni odvisna od Google Fonts in deluje tudi
brez interneta ali za zasebnostnimi brskalniki.

> **Zakaj lokalno:** Googlov »latin-ext« nabor za Lato ne vsebuje črke **č**,
> zato se je ta izrisovala v napačni (nadomestni) pisavi. Lokalne datoteke
> imajo poln nabor, zato se šumniki **č / š / ž** povsod izrišejo pravilno.

---

## 5. Animacije

| Animacija | Kje |
|---|---|
| Postopen prihod naslova, besedila in gumbov | ob nalaganju vsake strani |
| Ročno narisan krog okoli poudarjene besede | naslovi (ponovi se vsakih 8 s) |
| Razkrivanje odsekov ob drsenju | vsi odseki (`data-reveal`) |
| Zamik po elementih v mreži | kartice storitev (`data-stagger`) |
| Vrstica napredka na vrhu | ob drsenju |
| Pomanjšanje glave in temno ozadje | ob drsenju |
| Rahel paralaks glavne fotografije | vstopna stran |
| Plavajoča telefonska značka, lebdeči krogi v ozadju | vstopna stran |
| Tekoči napis s storitvami | pod junakom |
| Dvig kartice in polnjenje gumba ob prehodu z miško | povsod |
| Števci (3 / 60 min / 1) | vstopna stran |
| Barvni zemljevid ob prehodu z miško | vstopna stran in kontakt |
| Odpiranje menija v krogu | telefon / tablica |

Vse animacije se **samodejno izklopijo**, če ima obiskovalec v sistemu
vklopljeno nastavitev »zmanjšaj gibanje« (`prefers-reduced-motion`).

### Kako dodate animacijo novemu elementu

```html
<div data-reveal>...</div>                 <!-- prihod od spodaj -->
<div data-reveal="left">...</div>          <!-- z leve -->
<div data-reveal="right">...</div>         <!-- z desne -->
<div data-reveal="zoom">...</div>          <!-- rahlo povečanje -->
<div data-reveal="mask">...</div>          <!-- razkritje od zgoraj navzdol -->
<div data-reveal data-delay="200">...</div><!-- z zamikom 200 ms -->

<div class="grid grid--3" data-stagger="140">  <!-- otroci se pojavijo eden za drugim -->
```

Krog okoli besede:

```html
<span class="mark">beseda
  <svg viewBox="0 0 500 150" preserveAspectRatio="none" aria-hidden="true">
    <path d="M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7c66.2,7.1,169.9,3.7,225.1-16.9c56.7-21.2,42.6-53.9-16.6-70.3C311.7,44.4,270.4,35.4,224,31.5"/>
  </svg>
</span>
```

---

## 6. Objava na spletu

1. Registrirajte domeno (npr. `salon-svetlana.si`).
2. Vsebino mape `spletna-stran/` naložite v korensko mapo strežnika
   (`public_html` ali `www`) — datoteke, **ne** same mape.
3. Vklopite HTTPS (pri večini ponudnikov brezplačno, Let's Encrypt).

Brezplačne možnosti brez klasičnega gostovanja: Netlify Drop, Cloudflare Pages
ali GitHub Pages — pri vseh mapo enostavno povlečete v brskalnik.

Po objavi v vseh datotekah zamenjajte `href="index.html"` v oznaki
`<link rel="canonical">` s pravim naslovom, npr.
`<link rel="canonical" href="https://salon-svetlana.si/">`.

---

## 7. Opombe

- Podatki za Google (tip **HairSalon**: naslov, telefon, storitve) so že vpisani
  v `index.html`. Priporočam še brezplačen vpis v **Google Business Profile** —
  za lokalni salon prinese največ obiskov.
- Zemljevid je Googlov vgrajeni okvir; deluje brez ključa API.
- Rok projekta: **september 2026**.
- Stran nima kontaktnega obrazca — obrazec potrebuje strežnik s pošiljanjem
  e-pošte. Ker je naročanje ionako telefonsko, so povsod uporabljene povezave
  `tel:` in `sms:`, ki na telefonu odprejo klic oz. sporočilo.
