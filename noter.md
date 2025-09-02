noter til projekt

opgavebeskrivelse:

virksomhed, som vil ekspandere -> scaling
mobil web-app, hvor brugere skal kunne finde og tilmelde sig aktiviteter

sider:
velkommen (alle)
aktiviteter (alle)
aktivitetsdetaljeside (alle - logget ind: tilmeld knap)
søgeside
kalender (hhv. bruger og instruktør)
holdoversigt (instruktør)
log ind side

valgfrie opg:
a) deployes til online hosting side
b) brugerregistreringsformular (default rolle)
c) cookies (huske brugeren fra gang til gang, brugeren vælger selv om de vil huskes - valgt at blive husket: sendes til kalender i stedet for log ind skærm)

aflever projekt + dokumentation (og api hvis du har lavet ændringer)

kravsspecifikation:
fælles: 
    - i bunden af aktiviteter, aktivitetsdetaljer, søg, kalender, default og kalender holdoversigt vises navigation i bunden
    - knapper: hjem (aktiviteter), søg (søgeside), kalender (kalender)
    - formularer skal valideres og give fornuftig respons til brugeren

velkommen
    - vises hver gang appen åbnes (medmindre du laver opg c)
    - knap i bunden animeres ind på siden (fra usynlig til synlig på 1500ms) og viser videre til aktiviteter

aktiviteter
    - vertikal scroll i liste
    - statisk overskrift og navigation
    - link til detaljeside

aktivitetsdetaljer
    - navn på aktivitet
    - ugedag (ikke med i layoyt)
    - tidspunkt
    - beskrivelse
    - aldersbegrænsning
    - tilmeldingsknap (hvis logget ind) - hvis allerede tilmeld: forlad-knap i stedet. knappen vises ikke hvis brugeren ikke er logget ind
    - brugeren må ikke kunne tilmelde sig samme aktivitet flere gange
    - brugeren må ikke kunne tilmelde sig andre aktiviteter, der foregår samme ugedag
    - alle aktiviteter har aldersbegrænsning. brugeren må ikke kunne tilmelde sig aktiviteter uden for deres alder.

kalender bruger
    - viser oversigt over, hvilke aktiviterer, brugeren er tilmeldt
    - link til aktivitetsdetaljer

kalender instruktør
    - viser oversigt over de aktiviteter, man er instruktør for
    - link til kalender, holdoversigt

kalender, holdoversigt instruktør
    - en liste over tilmeldinger til en aktivitet

søgeside
    - søgning i de aktiviteter, som tilbydes
    - vis kun resultater efter der er søgt (enten onchange eller onscroll)
    - hvis ingen resultater, skriv: "Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget andet."