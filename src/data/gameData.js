export const CHAPTERS = [
  {
    id: "wien",
    title: "Wien, 1900",
    subtitle: "Das Kaffeehaus der Moderne",
    location: "Wien",
    year: "~1900",
    intro: `Du steigst aus dem Zug am Westbahnhof und spürst sofort die besondere Stimmung dieser Stadt. Wien, Hauptstadt einer schwindenden Weltmacht, brodelt vor kultureller Energie. Dein Redakteur hat dich hierher geschickt: „Finde heraus, was diese ‚Wiener Moderne' wirklich ist."

Im Café Central setzt sich ein junger Mann zu dir — er stellt sich als Kritiker der Neuen Freien Presse vor. „Sie kommen zur richtigen Zeit", sagt er. „Wien verändert sich gerade. Aber um zu verstehen, was hier passiert, müssen Sie einige Fragen beantworten können."`,
    scenes: [
      {
        id: "wien_1",
        character: "Der Kaffeehausliterat",
        portrait: "☕",
        narrative: `„Hier in Wien sitzt Arthur Schnitzler, Arzt und Dichter. Er schreibt ‚Leutnant Gustl' — eine Geschichte, die komplett im Kopf des Protagonisten spielt, ohne einen einzigen erklärenden Erzähler. Ich nenne das: Innerer Monolog." Er tippt auf sein Notizbuch. „Was ist das Besondere daran — historisch gesehen?"`,
        question: {
          text: "Was ist Schnitzlers historische Leistung mit dem ‚Inneren Monolog' in der deutschsprachigen Literatur?",
          options: [
            { text: "Er hat den Inneren Monolog als Erster konsequent in der deutschsprachigen Literatur eingesetzt", correct: true, explanation: "Genau! Schnitzler (1862–1931) gilt als Pionier des Inneren Monologs im deutschsprachigen Raum. ‚Leutnant Gustl' (1900) zeigt erstmals konsequent das ungefilterte Bewusstsein einer Figur — ohne erzählerischen Kommentar." },
            { text: "Er hat den Inneren Monolog aus dem Englischen übersetzt und ins Deutsche eingeführt", correct: false, explanation: "Schnitzler hat die Technik nicht übersetzt, sondern selbst entwickelt — unabhängig und zeitgleich mit internationalen Strömungen (z.B. Joyce). Er ist kein Vermittler, sondern ein Erfinder." },
            { text: "Er hat den Inneren Monolog verboten, weil er ihn als unmoralisch betrachtete", correct: false, explanation: "Das Gegenteil: Schnitzler wurde wegen ‚Leutnant Gustl' angefeindet — das Militär war empört über das enthüllende Innenleben des Offiziers. Er hat die Technik erfunden, nicht verboten." },
            { text: "Er hat den Inneren Monolog nur in Theaterstücken, nie in Prosa verwendet", correct: false, explanation: "Schnitzler hat den Inneren Monolog gerade in der Prosa entwickelt — ‚Leutnant Gustl' ist eine Novelle. Auch ‚Fräulein Else' (1924) nutzt dieselbe Technik." },
          ],
        },
      },
      {
        id: "wien_2",
        character: "Der Kaffeehausliterat",
        portrait: "☕",
        narrative: `Er zeichnet ein Diagramm auf eine Serviette. „Sehen Sie: Der Realismus endet um 1880. Dann kommt der Naturalismus — 1880 bis 1900. Danach spaltet sich alles auf. Aber an welchem Punkt? Was ist die entscheidende Frage, die bestimmt, welche Strömung eine Autorin oder ein Autor einschlägt?"`,
        question: {
          text: "Was ist laut dem Strömungsdiagramm der entscheidende Gabelpunkt, der Naturalismus von Impressionismus und Symbolismus trennt?",
          options: [
            { text: "Die Frage nach der Gesellschaftskritik: Soll Literatur anklagen — oder das innere Erleben zeigen?", correct: true, explanation: "Richtig! Das Strömungsdiagramm zeigt einen Entscheidungspunkt ‚Gesellschaftskritik?': Wer Ja sagt, schreibt anklagend über die Arbeiterklasse (Naturalismus im engen Sinne). Wer Nein sagt, wendet sich dem inneren Erleben zu — und landet bei Impressionismus, Jugendstil oder Symbolismus." },
            { text: "Die Frage, ob ein Werk auf Deutsch oder Französisch verfasst wird", correct: false, explanation: "Sprache ist kein Kriterium im Strömungsdiagramm. Die Weiche liegt inhaltlich-ästhetisch: gesellschaftliche Außenwelt vs. subjektives Innenleben." },
            { text: "Die Entscheidung, ob man den Ersten Weltkrieg unterstützt oder ablehnt", correct: false, explanation: "Der Erste Weltkrieg (1914–1918) taucht im Diagramm erst später auf — als Einflussfaktor auf den Expressionismus. Er ist nicht der Gabelpunkt zwischen Naturalismus und Impressionismus." },
            { text: "Die Wahl zwischen Vers und Prosa als literarische Form", correct: false, explanation: "Formfragen (Vers/Prosa) bestimmen die Strömungen nicht. Naturalismus, Impressionismus und Symbolismus gibt es alle sowohl in Lyrik als auch in Prosa." },
          ],
        },
      },
      {
        id: "wien_3",
        character: "Der Kaffeehausliterat",
        portrait: "☕",
        narrative: `„Noch eine letzte Frage, bevor Sie weiterreisen." Er faltet die Serviette zusammen. „Der Naturalismus hatte eine klare gesellschaftliche Haltung — er klagte an. Die Arbeiterklasse, die Armut, die Ungerechtigkeit. Was war das literarische Programm dieser Richtung?"`,
        question: {
          text: "Was kennzeichnet den Naturalismus als Strömung, die aus dem Entscheidungspunkt ‚Gesellschaftskritik: Ja' hervorgeht?",
          options: [
            { text: "Anklagende Darstellung sozialer Realität — vor allem das Leben der Arbeiterklasse", correct: true, explanation: "Genau! Der Naturalismus (1880–1900) wollte die Gesellschaft schonungslos zeigen: Armut, Alkoholismus, Ausbeutung. Gerhart Hauptmanns ‚Die Weber' (1892) ist das bekannteste Beispiel — ein Aufstand der schlesischen Weber auf der Bühne." },
            { text: "Romantische Verklärung des einfachen Landlebens", correct: false, explanation: "Romantik und Verklärung sind das Gegenteil des Naturalismus. Naturalismus zeigt die harte Realität, nicht das Idyll." },
            { text: "Abstrakte, symbolische Darstellung ohne konkreten gesellschaftlichen Bezug", correct: false, explanation: "Das ist eher der Symbolismus — die andere Richtung am Gabelpunkt. Naturalismus ist dezidiert konkret und gesellschaftsbezogen." },
            { text: "Die Beschreibung aristokratischer Salons und höfischen Lebens", correct: false, explanation: "Aristokratie und Salon sind Themen der älteren Epik. Der Naturalismus interessiert sich für das untere Ende der Gesellschaft — nicht für ihre Spitze." },
          ],
        },
      },
    ],
  },
  {
    id: "berlin",
    title: "Berlin, 1910",
    subtitle: "Im Strudel des Expressionismus",
    location: "Berlin",
    year: "~1910",
    intro: `Du nimmst den Zug nach Berlin. Was für ein Kontrast! Wien war elegant und melancholisch — Berlin ist laut, industriell, rücksichtslos. Überall Fabriken, Arbeiterviertel, Litfaßsäulen mit Ausstellungsplakaten. In einer Galerie am Kurfürstendamm findest du deine nächste Kontaktperson: eine Malerin mit nickelbrille, umgeben von grellen, verzerrten Bildern.

„Sie kommen zu einem wichtigen Moment", sagt sie. „Die Expressionisten sind gerade dabei, alles zu verändern."`,
    scenes: [
      {
        id: "berlin_1",
        character: "Die Expressionistin",
        portrait: "🎨",
        narrative: `„Expressionismus — was stellen Sie sich darunter vor? Hier ist ein Gedicht von Georg Heym: ‚Der Gott der Stadt' — darin sitzt ein dämonischer Gott auf einem Häuserblock und herrscht über die Metropole. Was kennzeichnet den Expressionismus literarisch?"`,
        question: {
          text: "Welches Merkmal ist typisch für den literarischen Expressionismus?",
          options: [
            { text: "Verzerrung, Schrei, Entfremdung — emotionale Überwältigung statt realistischer Abbildung", correct: true, explanation: "Richtig! Expressionisten wollten nicht abbilden, sondern ausdrücken (lat. exprimere). Verzerrung, Kontrast, Überwältigung, Apokalypse — das sind ihre Mittel. Gegen die bürgerliche Gesellschaft, gegen den Krieg, gegen die Entfremdung." },
            { text: "Genaue Beobachtung und sachliche Beschreibung des Alltags", correct: false, explanation: "Das ist das Gegenteil — sachliche Beschreibung gehört zur Neuen Sachlichkeit (1920er) oder zum Naturalismus. Expressionismus ist anti-naturalistisch." },
            { text: "Elegante Sprache und eine impressionistische Stimmungsmalerei", correct: false, explanation: "Impressionismus und Expressionismus klingen ähnlich, sind aber fast Gegensätze. Der Impressionismus malt Stimmungen und Nuancen — der Expressionismus bricht, schreit, verzerrt." },
            { text: "Strenge Versmasse und klassische Formensprache", correct: false, explanation: "Expressionismus bricht mit klassischen Formen. Freie Rhythmen, Neologismen, Syntax-Brüche — das sind seine Mittel." },
          ],
        },
      },
      {
        id: "berlin_2",
        character: "Die Expressionistin",
        portrait: "🎨",
        narrative: `Sie deutet auf einen Zeitungsausschnitt an der Wand: August 1914. „Sehen Sie das? Der Krieg. Für uns Expressionisten ist das kein Zufall — wir haben das kommen sehen, die Katastrophe, den Zusammenbruch. Das Strömungsdiagramm der Literaturgeschichte zeigt es genau: Ein historisches Ereignis prägt den Expressionismus entscheidend. Welches?"`,
        question: {
          text: "Welches historische Ereignis beeinflusst laut dem Strömungsdiagramm den Expressionismus maßgeblich?",
          options: [
            { text: "Der Erste Weltkrieg (1914–1918)", correct: true, explanation: "Richtig! Das Strömungsdiagramm zeigt den Ersten Weltkrieg als direkten Einflussfaktor auf den Expressionismus (1910–1925). Vor dem Krieg ahnten die Expressionisten die Katastrophe — nach dem Krieg wurde ihre Literatur noch radikaler, politischer, utopischer." },
            { text: "Die Französische Revolution (1789)", correct: false, explanation: "Die Französische Revolution liegt über 100 Jahre vor dem Expressionismus und ist nicht Teil des Strömungsdiagramms zur literarischen Moderne (1880–1925)." },
            { text: "Die Weltwirtschaftskrise (1929)", correct: false, explanation: "Die Weltwirtschaftskrise trifft die Weimarer Republik hart — aber sie liegt nach dem Expressionismus (1910–1925) und ist eher ein Faktor für die Neue Sachlichkeit und den Untergang der Republik." },
            { text: "Die Russische Revolution (1917)", correct: false, explanation: "Die Russische Revolution beeinflusste einzelne Expressionisten politisch, steht aber nicht als zentraler Faktor im Strömungsdiagramm — der Erste Weltkrieg ist der entscheidende Einschnitt." },
          ],
        },
      },
      {
        id: "berlin_3",
        character: "Die Expressionistin",
        portrait: "🎨",
        narrative: `„Und wohin strebt das alles?" Sie zeigt auf einen Pfeil am Ende des Diagramms. „Der Expressionismus hat eine Vision — nicht nur Schrei und Zerfall, sondern ein Ziel. Was steht am Ende des Strömungsdiagramms als Endziel des Expressionismus?"`,
        question: {
          text: "Was ist laut dem Strömungsdiagramm das utopische Ziel des Expressionismus?",
          options: [
            { text: "‚Der neue Mensch' — eine Vision der erneuerten, befreiten Menschheit", correct: true, explanation: "Genau! Am Ende des Strömungsdiagramms steht ‚Der neue Mensch'. Der Expressionismus wollte nicht nur anklagen und zerstören — er träumte von einer grundlegenden Erneuerung: Mensch, Gesellschaft, Kunst. Eine utopische Reaktion auf Krieg und Entfremdung." },
            { text: "‚Die alte Ordnung' — Rückkehr zu klassischen Werten und Formen", correct: false, explanation: "Das ist das Gegenteil der expressionistischen Vision. Der Expressionismus kämpfte gegen die alte Ordnung — Bürgertum, Militarismus, Konvention. Eine Rückkehr war das letzte, was er wollte." },
            { text: "‚Der Übermensch' im Sinne Nietzsche's Philosophie", correct: false, explanation: "Nietzsche hatte Einfluss auf die Moderne, aber ‚Der Übermensch' ist nicht das Schlagwort im Strömungsdiagramm. Das Diagramm endet mit ‚Der neue Mensch' — ein kollektiver, humanistischer Begriff, kein elitäres Konzept." },
            { text: "‚Die soziale Republik' — demokratische Gleichstellung aller Bürger", correct: false, explanation: "Politische Gleichstellung war manchen Expressionisten wichtig, aber ‚Die soziale Republik' steht nicht im Strömungsdiagramm. Das Ziel lautet ‚Der neue Mensch' — breiter und utopischer als ein konkretes politisches Programm." },
          ],
        },
      },
    ],
  },
  {
    id: "prag",
    title: "Prag, 1915",
    subtitle: "Im Labyrinth Kafkas",
    location: "Prag",
    year: "~1915",
    intro: `Prag. Eine Stadt zwischen den Welten — Deutsch und Tschechisch, Habsburger Reich und aufkeimende Nationen, Moderne und Mittelalter. Du hast einen Brief erhalten: „Kommen Sie in die Altstädter Apotheke. Fragen Sie nach dem Herrn K."

Der Mann, den du triffst, ist blass, schmal, mit riesigen dunklen Augen. Er ist Büroangestellter bei einer Versicherung und schreibt nachts. Er heißt Franz Kafka.`,
    scenes: [
      {
        id: "prag_1",
        character: "Franz Kafka",
        portrait: "🪲",
        narrative: `Er schaut dich seltsam an. „Auf Ihrem Miro-Board steht bei meinem Namen ein Schlagwort: ‚Aufstand & Verletzung'. Was glauben Sie, was das bedeutet? Was ist das zentrale Thema, das mein Werk durchzieht — laut diesem Schlagwort?"`,
        question: {
          text: "Was bezeichnet das Schlagwort ‚Aufstand & Verletzung' auf Kafkas Autoren-Card?",
          options: [
            { text: "Die Rebellion der Jugend gegen die Vatergeneration", correct: true, explanation: "Richtig! Kafkas Werk kreist um den Konflikt mit dem Vater — am deutlichsten im ‚Brief an den Vater' (1919). Das Schlagwort ‚Aufstand & Verletzung' beschreibt diese Dynamik: Der Sohn rebelliert, wird dabei aber verletzt. Ein Thema, das Kafka selbst zutiefst betraf." },
            { text: "Den bewaffneten Widerstand gegen die k.u.k. Monarchie", correct: false, explanation: "Kafka war kein politischer Revolutionär. Sein ‚Aufstand' ist persönlich und existenziell, nicht politisch-militärisch. Er kämpfte in Briefen und Texten — nicht auf der Straße." },
            { text: "Körperliche Gewalt als zentrales Motiv in seinen Erzählungen", correct: false, explanation: "Gewalt kommt bei Kafka vor (z.B. ‚In der Strafkolonie'), ist aber nicht das, was ‚Aufstand & Verletzung' auf dem Autoren-Card bezeichnet. Es geht um das psychologische Verhältnis zur Autorität — vor allem zum Vater." },
            { text: "Den Ersten Weltkrieg als traumatisches Erlebnis der Autorengeneration", correct: false, explanation: "Kafka schrieb zwar während des Ersten Weltkriegs, aber das Schlagwort ‚Aufstand & Verletzung' bezieht sich nicht auf den Krieg. Es beschreibt eine familiäre, psychologische Dynamik — Vater gegen Sohn." },
          ],
        },
      },
      {
        id: "prag_2",
        character: "Franz Kafka",
        portrait: "🪲",
        narrative: `Er reicht dir ein Manuskript. „Das ist ‚In der Strafkolonie'. Ein Offizier erklärt einer Maschine, die Urteile in die Haut der Verurteilten ritzt. Der Begriff ‚kafkaesk' — haben Sie davon gehört? Was meint er?"`,
        question: {
          text: "Was bedeutet der Begriff ‚kafkaesk'?",
          options: [
            { text: "Eine Situation, die bedrohlich, bürokratisch-absurd und ausweglos erscheint, ohne klar erkennbare Logik", correct: true, explanation: "Richtig! ‚Kafkaesk' beschreibt eine Atmosphäre von Bedrohung und Ausweglosigkeit, kombiniert mit einer bürokratischen oder surrealen Logik, gegen die man sich nicht wehren kann. Josef K. in ‚Der Process' ist das Paradebeispiel." },
            { text: "Eine düstere Naturlandschaft mit viel Nebel und Melancholie", correct: false, explanation: "Naturlandschaften spielen bei Kafka kaum eine Rolle. ‚Kafkaesk' bezieht sich auf gesellschaftliche und psychologische Strukturen, nicht auf Landschaft." },
            { text: "Sehr langer, philosophisch schwer verständlicher Prosatext", correct: false, explanation: "Kafka schreibt oft erstaunlich klar und sachlich — das macht seine Texte so unheimlich. ‚Kafkaesk' meint die Situation, nicht den Stil." },
            { text: "Humorvoller Nonsens im Sinne des Absurden Theaters", correct: false, explanation: "Kafka hat durchaus schwarzen Humor, aber ‚kafkaesk' wird nicht mit Nonsens-Komödie gleichgesetzt. Der Begriff betont Bedrohung und Ausweglosigkeit." },
          ],
        },
      },
      {
        id: "prag_3",
        character: "Franz Kafka",
        portrait: "🪲",
        narrative: `Kafka schaut dich lange an. „Noch eine Frage. Ich schreibe auf Deutsch — obwohl ich in Böhmen lebe und Tschechisch höre. Auch Rilke schrieb auf Deutsch, obwohl er aus Prag stammt. Was kennzeichnet den ‚Prager Kreis'?"`,
        question: {
          text: "Was kennzeichnet den ‚Prager Kreis' als literarisches Phänomen?",
          options: [
            { text: "Deutschsprachige jüdische Autoren in Prag, die zwischen mehreren Kulturen und Identitäten standen", correct: true, explanation: "Genau! Der Prager Kreis (u.a. Kafka, Max Brod, Franz Werfel) bestand vor allem aus deutschsprachigen jüdischen Intellektuellen in der tschechischsprachigen Stadt Prag — eine dreifache Randposition, die ihre Literatur prägte: deutsch, jüdisch, böhmisch." },
            { text: "Eine Gruppe tschechischer Nationalisten, die auf Deutsch schrieben, um gehört zu werden", correct: false, explanation: "Es waren keine Nationalisten — eher das Gegenteil: Menschen ohne klares nationales Zuhause. Die nationale Frage war für sie eine Quelle von Fremdheit, nicht Überzeugung." },
            { text: "Eine Geheimgesellschaft, die okkulte Symbolik in ihre Texte einbaute", correct: false, explanation: "Es gab keine geheimen oder okkulten Aktivitäten. Der ‚Prager Kreis' war eine lockere, intellektuelle Gemeinschaft, die sich in Kaffeehäusern traf." },
            { text: "Dichter, die Prags mittelalterliche Architektur als Inspirationsquelle nutzten", correct: false, explanation: "Prags Architektur spielt als Atmosphäre eine Rolle, ist aber nicht das definierende Merkmal. Das Entscheidende ist die kulturelle Mehrfachidentität." },
          ],
        },
      },
    ],
  },
  {
    id: "weimar",
    title: "Berlin / Weimar, 1925",
    subtitle: "Die Goldenen Zwanziger",
    location: "Weimarer Republik",
    year: "~1925",
    intro: `Du kehrst nach Berlin zurück — aber welch eine andere Stadt! Die Kaiserzeit ist vorbei, die Revolution hat stattgefunden. Es ist die Weimarer Republik. Trotz politischer Instabilität pulsiert das kulturelle Leben: Kabaretts, Jazz, Kino, Nachtleben. Und eine neue literarische Strömung macht von sich reden: die Neue Sachlichkeit.

Im Romanischen Café triffst du eine Journalistin. Sie schreibt Reportagen für die Berliner Illustrirte.`,
    scenes: [
      {
        id: "weimar_1",
        character: "Die Reporterin",
        portrait: "📰",
        narrative: `„Alfred Döblin — kennen Sie ihn? Ihr Miro-Board hat ihm eine ganz eigene Karte gegeben, mit einem präzisen Schlagwort: ‚Montage & Großstadt'. Was meint das konkret? Wie schreibt jemand, der mit ‚Montage & Großstadt' beschrieben wird?"`,
        question: {
          text: "Was beschreibt das Schlagwort ‚Montage & Großstadt' auf Döblins Autoren-Card?",
          options: [
            { text: "Collageartiges Schreiben, das Lärm und Rhythmus der Großstadt abbildet — Zeitungsartikel, Reklame, innere Monologe gleichzeitig", correct: true, explanation: "Genau! Döblin (1878–1957) montiert in ‚Berlin Alexanderplatz' (1929) alles durcheinander wie die Stadt selbst: Schlagzeilen, Wetterberichte, Stimmen, Gedanken — ein Collage-Roman, der den Puls der Metropole nachahmt." },
            { text: "Präzise Stadtpläne und Architekturskizzen als literarische Illustration", correct: false, explanation: "Döblin zeichnet keine Stadtpläne. ‚Montage & Großstadt' meint die Schreibtechnik — das Nebeneinanderstellen von Textsorten und Eindrücken, nicht visuelle Illustration." },
            { text: "Einfache, zugängliche Sprache für das Berliner Arbeiterpublikum", correct: false, explanation: "Döblins Montage-Stil ist alles andere als einfach — er ist experimentell und komplex. Zugänglichkeit für ein breites Publikum war nicht sein Ziel." },
            { text: "Fotomontagen und Bildcollagen als Ergänzung zum Text", correct: false, explanation: "Fotomontage war eine Technik der Dadaisten (John Heartfield). Döblin nutzt Montage literarisch — als Technik der Sprache, nicht der Bildenden Kunst." },
          ],
        },
      },
      {
        id: "weimar_2",
        character: "Die Reporterin",
        portrait: "📰",
        narrative: `„Bertolt Brecht — haben Sie ihn schon getroffen? Er ist anders als alle. Sein Theater will das Publikum nicht verführen, sondern zum Denken zwingen." Sie zeigt auf ein Plakat der ‚Dreigroschenoper'. „Was meint Brecht mit dem ‚Verfremdungseffekt'?"`,
        question: {
          text: "Was ist Brechts ‚Verfremdungseffekt' (V-Effekt)?",
          options: [
            { text: "Techniken, die verhindern sollen, dass sich das Publikum mit den Figuren identifiziert — es soll kritisch nachdenken statt mitfühlen", correct: true, explanation: "Genau! Brecht will kein Mitleid, keine Einfühlung. Stattdessen: direkte Ansprache des Publikums, Zwischentitel, Songs, die die Handlung kommentieren — das Publikum soll die gesellschaftlichen Verhältnisse analysieren, nicht vergessen, dass es im Theater sitzt." },
            { text: "Eine Technik, um auf der Bühne eine möglichst realistische Illusion zu erzeugen", correct: false, explanation: "Das ist das genaue Gegenteil! Realistische Illusion ist das Ziel des traditionellen Theaters (Stanislaw-System). Brecht kämpft dagegen — er will die Illusion brechen." },
            { text: "Die Verwendung von Fremdwörtern, um das Stück intellektueller zu machen", correct: false, explanation: "‚Verfremdung' ist ein theatraler Begriff, kein sprachlicher. Es geht um den Umgang mit Illusion und Identifikation, nicht um Vokabular." },
            { text: "Das Einblenden von Filmsequenzen in Theateraufführungen", correct: false, explanation: "Brecht nutzte manchmal Projektionen, aber der V-Effekt ist breiter: Er umfasst alle Techniken, die die Illusion durchbrechen und kritische Distanz erzeugen." },
          ],
        },
      },
      {
        id: "weimar_3",
        character: "Die Reporterin",
        portrait: "📰",
        narrative: `„Ach — und haben Sie auf Ihrem Board auch Virginia Woolf gesehen? Eine Engländerin auf einem Miro-Board über die deutschsprachige Moderne?" Sie lacht. „Kein Wunder — die literarische Moderne war international. Woolf steht dort mit einer klaren Technik. Welche ist es — und welches ihrer Werke erschien 1925?"`,
        question: {
          text: "Welche Technik wird Virginia Woolf auf dem Autoren-Card zugeschrieben, und welches Schlüsselwerk erschien 1925?",
          options: [
            { text: "Bewusstseinsstrom — und das Werk ist ‚Mrs. Dalloway' (1925)", correct: true, explanation: "Richtig! Virginia Woolf (1882–1941) ist die wichtigste internationale Vertreterin des Bewusstseinsstroms (Stream of Consciousness). ‚Mrs. Dalloway' (1925) spielt an einem einzigen Tag — aber der Roman taucht tief ins Innenleben der Figuren, frei von äußerem Plot." },
            { text: "Verfremdungseffekt — und das Werk ist ‚The Waves' (1931)", correct: false, explanation: "Der Verfremdungseffekt gehört zu Bertolt Brecht, nicht zu Virginia Woolf. Woolf schreibt Bewusstseinsstrom-Romane, kein episches Theater." },
            { text: "Innerer Monolog — und das Werk ist ‚Orlando' (1928)", correct: false, explanation: "Innerer Monolog ist Schnitzlers Schlagwort auf dem Board. Woolf arbeitet zwar verwandt, aber ihr Card-Begriff ist Bewusstseinsstrom. Das Schlüsselwerk auf dem Board ist ‚Mrs. Dalloway' (1925), nicht ‚Orlando'." },
            { text: "Montage & Großstadt — und das Werk ist ‚Ulysses' (1922)", correct: false, explanation: "‚Ulysses' (1922) stammt von James Joyce, nicht von Virginia Woolf. Montage & Großstadt ist Döblins Technik. Woolfs Schlagwort lautet Bewusstseinsstrom." },
          ],
        },
      },
    ],
  },
  {
    id: "finale",
    title: "Der Redaktionsschluss",
    subtitle: "Dein Bericht an die Nachwelt",
    location: "Überall",
    year: "1930",
    intro: `Du sitzt wieder im Zug. In deiner Tasche: volle Notizbücher, vier Städte, vier Epochen. Dein Redakteur erwartet einen umfassenden Bericht über die literarische Moderne 1890–1930.

Aber zuerst musst du die letzte Prüfung bestehen. Diese Fragen verbinden alles, was du erlebt hast — Wien, Berlin, Prag, Weimar. Nur wer die Epoche als Ganzes versteht, kann den Bericht schreiben.`,
    scenes: [
      {
        id: "finale_matching",
        type: "matching",
        character: "Dein Redakteur",
        portrait: "📋",
        narrative: `„Bevor wir anfangen — ein Test aus dem Stegreif. Das Miro-Board zeigt sechs Autoren der literarischen Moderne, jeder mit einem Schlagwort. Verbinden Sie jeden Autor mit seinem Schlagwort.\n\nKlicken Sie zuerst auf einen Autor, dann auf das passende Schlagwort."`,
        pairs: [
          { left: "Franz Kafka",      right: "Aufstand & Verletzung" },
          { left: "Alfred Döblin",    right: "Montage & Großstadt" },
          { left: "Virginia Woolf",   right: "Bewusstseinsstrom" },
          { left: "Thomas Mann",      right: "Neue Sachlichkeit" },
          { left: "Bertolt Brecht",   right: "Verfremdungseffekt" },
          { left: "James Joyce",      right: "Stream of Consciousness" },
        ],
        successText: "Perfekt! Das sind die sechs Autoren-Cards aus dem Miro-Board — jede mit ihrer literarischen Signatur. Jetzt zu den letzten Fragen. Zeigen Sie, dass Sie die Epoche als Ganzes verstehen.",
      },
      {
        id: "finale_1",
        character: "Dein Redakteur",
        portrait: "📋",
        narrative: `„Ihr Miro-Board zeigt fünf Autoren — jeweils mit einer Kerntechnik. Beweisen Sie, dass Sie sich das gemerkt haben. Welche Technik gehört zu welchem Autor?" Er legt fünf Kärtchen vor dir auf den Tisch. „Welche Aussage stimmt korrekt?"`,
        question: {
          text: "Welche Zuordnung von Autor und Technik ist laut den Autoren-Cards auf dem Board korrekt?",
          options: [
            { text: "Arthur Schnitzler → Innerer Monolog  /  Virginia Woolf → Bewusstseinsstrom  /  Brecht → Verfremdungseffekt", correct: true, explanation: "Perfekt! Das sind drei der fünf Techniken aus den Autoren-Cards: Schnitzler (Innerer Monolog, erste konsequente Verwendung im Deutschen), Woolf (Bewusstseinsstrom, inner experience), Brecht (Verfremdungseffekt, episches Theater). Döblin trägt ‚Montage & Großstadt', Kafka ‚Aufstand & Verletzung'." },
            { text: "Kafka → Verfremdungseffekt  /  Döblin → Bewusstseinsstrom  /  Schnitzler → Montage & Großstadt", correct: false, explanation: "Alle drei sind falsch. Verfremdungseffekt gehört zu Brecht, Bewusstseinsstrom zu Woolf, Montage & Großstadt zu Döblin. Schnitzler hat den Inneren Monolog, Kafka steht für ‚Aufstand & Verletzung'." },
            { text: "Virginia Woolf → Verfremdungseffekt  /  Brecht → Bewusstseinsstrom  /  Kafka → Innerer Monolog", correct: false, explanation: "Alle drei sind vertauscht. Verfremdungseffekt ist Brecht, Bewusstseinsstrom ist Woolf — und Innerer Monolog gehört zu Schnitzler, nicht zu Kafka." },
            { text: "Döblin → Aufstand & Verletzung  /  Kafka → Montage & Großstadt  /  Woolf → Innerer Monolog", correct: false, explanation: "Döblin und Kafka sind vertauscht: ‚Aufstand & Verletzung' ist Kafka, ‚Montage & Großstadt' ist Döblin. Virginia Woolf trägt Bewusstseinsstrom, nicht Innerer Monolog — das ist Schnitzlers Schlagwort." },
          ],
        },
      },
      {
        id: "finale_2",
        character: "Dein Redakteur",
        portrait: "📋",
        narrative: `„Ihr Board zeigt drei Schlüsselwerke der Moderne als Buchcover — Die Verwandlung, Mrs. Dalloway, und ein drittes." Er klopft auf den Tisch. „Dieses dritte Werk gilt als eines der einflussreichsten Bücher des 20. Jahrhunderts, erschienen 1922, und steht für den internationalen Bewusstseinsstrom. Von wem stammt es?"`,
        question: {
          text: "Welches Schlüsselwerk erschien 1922 und ist auf dem Miro-Board als drittes Werk abgebildet?",
          options: [
            { text: "‚Ulysses' von James Joyce", correct: true, explanation: "Richtig! ‚Ulysses' (1922) von James Joyce ist das dritte Schlüsselwerk auf dem Board. Es gilt als Meilenstein des Bewusstseinsstroms und beeinflusste die gesamte Moderne — auch Döblin beim Schreiben von ‚Berlin Alexanderplatz'." },
            { text: "‚Der Process' von Franz Kafka", correct: false, explanation: "‚Der Process' entstand zwar um 1914/15, wurde aber erst 1925 posthum veröffentlicht. Er ist nicht das dritte Werk auf dem Board — dort steht ‚Ulysses' von Joyce (1922)." },
            { text: "‚Berlin Alexanderplatz' von Alfred Döblin", correct: false, explanation: "‚Berlin Alexanderplatz' erschien 1929, nicht 1922. Es ist auch nicht auf dem Board als Schlüsselwerk abgebildet — die drei Werke sind ‚Die Verwandlung', ‚Ulysses' und ‚Mrs. Dalloway'." },
            { text: "‚Im Westen nichts Neues' von Erich Maria Remarque", correct: false, explanation: "Remarques Antikriegsroman erschien 1929 und ist nicht auf dem Miro-Board abgebildet. Das dritte Schlüsselwerk ist ‚Ulysses' von James Joyce (1922)." },
          ],
        },
      },
      {
        id: "finale_3",
        character: "Dein Redakteur",
        portrait: "📋",
        narrative: `„Letzte Frage. Ihr Board beginnt mit dem Realismus und endet mit dem Expressionismus. Was verbindet alle Strömungen dazwischen — was ist der gemeinsame Kern der literarischen Moderne, egal ob Impressionismus, Symbolismus oder Expressionismus?"`,
        question: {
          text: "Was ist das verbindende Merkmal aller Strömungen der literarischen Moderne (1890–1930)?",
          options: [
            { text: "Die Abkehr von der reinen Außenweltdarstellung hin zum subjektiven Erleben — Identität, Sprache und Wahrheit werden fragwürdig", correct: true, explanation: "Perfekt! Ob Schnitzlers Innerer Monolog, Woolfs Bewusstseinsstrom, Kafkas Entfremdung oder Döblins Montage — alle drehen sich um das verunsicherte, moderne Ich. Die stabile Außenwelt des Realismus ist verschwunden." },
            { text: "Die Begeisterung für technischen Fortschritt und Industrialisierung", correct: false, explanation: "Technik und Industrialisierung sind Themen der Moderne — aber Begeisterung wäre zu einfach. Die Reaktionen reichen von Faszination bis zu Schrecken und Entfremdung." },
            { text: "Die Rückkehr zu nationalen Mythen und Volkskultur", correct: false, explanation: "Nationale Mythen sind ein Thema der Romantik, nicht der Moderne. Die wichtigsten Vertreter der Moderne (Kafka, Woolf, Joyce) waren kosmopolitisch, nicht nationalistisch." },
            { text: "Der gemeinsame Kampf gegen den Ersten Weltkrieg", correct: false, explanation: "Die literarische Moderne beginnt vor dem Krieg (1890) und hat viele unpolitische Strömungen. Der Krieg ist ein Einfluss — aber nicht der gemeinsame Nenner aller Strömungen." },
          ],
        },
      },
    ],
  },
];

export const TOTAL_QUESTIONS = CHAPTERS.reduce(
  (sum, ch) => sum + ch.scenes.length,
  0
);
