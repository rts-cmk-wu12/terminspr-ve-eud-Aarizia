noter til projekt

sider:
velkommen (alle)
aktiviteter (alle)
aktivitetsdetaljeside (alle - logget ind: tilmeld knap)
søgeside (alle)

middleware:
kalender (hhv. bruger og instruktør)
holdoversigt (instruktør)
log ind side
b) brugerregistreringsformular (default rolle)


aflever projekt + dokumentation (og api hvis du har lavet ændringer)

kravsspecifikation:
fælles: 
    - formularer skal valideres og give fornuftig respons til brugeren

velkommen
    - vises hver gang appen åbnes (medmindre du laver opg c)


aktivitetsdetaljer
    - tilmeldingsknap (hvis logget ind) - hvis allerede tilmeld: forlad-knap i stedet. knappen vises ikke hvis brugeren ikke er logget ind
    - brugeren må ikke kunne tilmelde sig samme aktivitet flere gange
    - brugeren må ikke kunne tilmelde sig andre aktiviteter, der foregår samme ugedag
    - alle aktiviteter har aldersbegrænsning. brugeren må ikke kunne tilmelde sig aktiviteter uden for deres alder.

kalender instruktør
    - viser oversigt over de aktiviteter, man er instruktør for
    - link til kalender, holdoversigt

kalender, holdoversigt instruktør
    - en liste over tilmeldinger til en aktivitet

søgeside
    - søgning i de aktiviteter, som tilbydes
    - vis kun resultater efter der er søgt (enten onchange eller onscroll)
    - hvis ingen resultater, skriv: "Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget andet."