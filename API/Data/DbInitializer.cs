using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.VisualBasic;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {

            if(!userManager.Users.Any())
            {
                var user = new User 
                {
                    UserName = "Ermal",
                    Email = "ermal@bluetech.com"
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                 var user2 = new User 
                {
                    UserName = "Artin",
                    Email = "artin@bluetech.com"
                };
                await userManager.CreateAsync(user2, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user2, "Member");


                var admin = new User 
                {
                    UserName = "Admin",
                    Email = "admin@bluetech.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] {"Member", "Admin"});
            };

            

            if (context.Products.Any()) return;

            var products = new List<Product>
            {
             		new Product
                {
                    Name = "Playstation 5",
                    Description =
                        "The latest Sony PlayStation introduced in November 2020. Powered by an eight-core AMD Zen 2 CPU and custom AMD Radeon GPU, the PS5 is offered in two models: with and without a 4K Blu-ray drive. Supporting a 120Hz video refresh",
                    Price = 60000,
                    PictureUrl = "/images/products/pr1.png",
                    Brand = "Playstation",
                    Type = "Console",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Playstation 4 Slim 500GB",
                    Description = "Konzola e lojrave PlayStation 4 Slim përmban një procesor me arkitekturë me fuqi të ulët x86-64 AMD Jaguar me tetë bërthama, të plotësuar nga 8 GB memorie të unifikuar të sistemit GDDR5 dhe një përshpejtues grafik AMD Radeon me performancë të lartë 1.84 TFLOPS. Të dhënat e përdoruesit mund të ruhen në një hard disk të integruar me një kapacitet prej 500 GB. Gjithashtu disponohet një disku BD/DVD vetëm për lexim (BD 6x CAV, DVD 8x CAV). Hyrjet dhe daljet: 2x USB Type 3.1 dhe port AUX. Lidhjet e rrjetit përfshijnë 1x Ethernet, IEEE 802.11 a/b/g/n/ac Wi-Fi dhe Bluetooth v4.0. Furnizimi me energji elektrike AC 100-240 V, 50/60 Hz. Konsumi i energjisë maksimumi 165 W. Dalja AV: Porti dalës HDMI mbështet HDR. Kontrolluesi i ri i lojërave DualShock 4 v2 është një mjet inovativ për përvojën e fundit të lojërave. Ai është i pajisur me një sensor jashtëzakonisht të ndjeshëm me gjashtë boshte dhe një panel me prekje që ofron mënyra krejtësisht të reja për të luajtur lojëra dhe për të ndërvepruar. Butoni i ri SHARE lejon transferimin dhe ndarjen e videos me një prekje. Paketa përfshin gjithashtu një kod për të shkarkuar lojën Call of Duty: Modern Warfare 2.",
                    Price = 46900,
                    PictureUrl = "/images/products/pr2.png",
                    Brand = "Playstation",
                    Type = "Console",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Xbox Series X 1TB",
                    Description =
                        "Xbox Series X është Xbox më i shpejtë dhe më i fuqishëm ndonjëherë. Luaj mijëra tituj nga katër gjenerata të konzolave. Në qendër të Xbox Series X është teknologjia Xbox Velocity Architecture, e cila kombinon një SSD të veçantë me softuer të integruar për lojëra më të shpejta dhe më efikase duke ngarkuar dukshëm më shpejt. Falë teknologjisë Quick Resume, mund të kaloni pa probleme midis shumë lojërave. Shijoni lojërat 4K deri në 120 korniza për sekondë me tingull të avancuar rrethues dhe veçori të tjera. Kontrolleri wireless Xbox ka pësuar një risi që rrit nivelin e rehatisë për lojtarët gjatë çdo loje. Doreza me teksturë është e rehatshme për t'u mbajtur, nuk rrëshqet dhe përmirëson saktësinë tuaj. Plus, veçoritë e integruara e bëjnë të lehtë kapjen dhe shkëmbimin e përmbajtjes.Forza Horizon 5 nga zhvilluesit e Playground Games do të ofrojë një mjedis miqësor dhe intuitiv që edhe një fillestar mund ta zotërojë me lehtësi. Zgjidhni të preferuarën tuaj nga më shumë se 550 modele makinash dhe vendoseni në pistë. Komploti i Forza Horizon zhvillohet në Meksikë, domethënë në një mjedis që kërkon si klimë ashtu edhe terren, i cili përfshihet në lojë edhe në nuancat më të vogla. Mund të hasni lehtësisht një vullkan aktiv, qytete ose tempuj Mayan.",
                    Price = 70000,
                    PictureUrl = "/images/products/pr3.png",
                    Brand = "Xbox",
                    Type = "Console",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Xbox Series S 512GB",
                    Description =
                        "Një konzolë novatore me performancë të lartë që bën përshtypje me trupin e saj kompakt, ndër të tjera - është madje pothuajse 60 për qind më e vogël se vëllai i tij më i fuqishëm, Xbox Series X. Për të rritur fuqinë kompjuterike, konzola përdor një zgjidhje të dizajnuar me porosi NVME SSD me arkitekturë Xbox Velocity, e cila ka një ndikim të rëndësishëm në zvogëlimin e shpejtësisë së ngarkimit të skedarëve të lojërave dhe ndërrimin e shpejtë të lojërave.Konzola bën përshtypje me deri në 120 korniza në sekondë, e cila kontribuon në \"butësinë\" e lojërave dhe ndihmon për të përjetuar përmbajtjen e lojës edhe më realisht.Në \"S\" të ri do të shijoni më shumë se 100 lojëra në cilësi të shkëlqyera, të cilat janë akorduar në mënyrë të përsosur për të.Xbox Serie S përmban një pajisje të fuqishme që jo vetëm kap deri në 120 korniza në sekondë në 1440p, por gjithashtu ofron pamje të lë pa frymë me gjurmimin e rrezeve DirectX dhe Shading të Shkallës së Ndryshueshme.Rritja 4K mbështetet në lojëra, të cilat do t'i vlerësoni kur avulloni në ekranet e mëdha të sheshta. Videot mund të transmetohen gjithashtu në 4K.",
                    Price = 42000,
                    PictureUrl = "/images/products/pr4.png",
                    Brand = "Xbox",
                    Type = "Console",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Kontroller Xbox Series Wireless",
                    Description =
                        "Pajisja ka një dizajn të modernizuar dhe ofron rehati të madhe falë dorezave me teksturë. Përfshin një numër teknologjish të përparuara që sjellin një përvojë edhe më besnike të lojërave. Ka gjithashtu leva precize analoge dhe mundësinë e butonave të hartës. Për më tepër, kontrolleri ridizenjohet me D-pad hibrid dhe është i pajtueshëm me tastierat e zgjedhura, PC, Windows 10, Android dhe iOS. Prej ndërfaqeve posedon: port 3.5 mm dhe USB-C, si dhe mund t'a lidheni me konsolat Xbox One duke përdorur teknologjinë pa tela Xbox dhe Bluetooth.",
                    Price = 8200,
                    PictureUrl = "/images/products/pr5.png",
                    Brand = "Xbox",
                    Type = "Controller",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Kontroller wireless Xbox Elite Series 2",
                    Description =
                        "Kontrolleri wireless Xbox Elite Series 2 është krijuar për të përmbushur nevojat e lojtarëve konkurrues të sotëm. Ai ofron më shumë se 30 mënyra për të luajtur lojëra si profesionist. Personalizojeni gamepad Xbox Elite Series 2 për t'iu përshtatur stilit të lojës që ju pëlqen ose ju nevojitet. E gjithë kjo është e mundur me ndihmën e formave të reja të levave dhe levave të ndërrimit që mund të zëvendësohen. Përveç kësaj, mund të ruani deri në 3 profile të personalizuara plus një parazgjedhje në kontrollues dhe të kaloni mes tyre me një buton. Aplikacioni Xbox Accessories lejon personalizim të pakufizuar sipas preferencave tuaja. Mund të përdorni opsione të ndryshme konfigurimi, për shembull butonat e hartës për komandat zanore, të tilla si \"record that\" ose \"take a screenshot\". Caktoni një buton për të vepruar si tasti SHIFT dhe aktivizoni hyrjet alternative për të gjithë butonat e tjerë.Bateria e rikarikueshme zgjat deri në 40 orë dhe të gjithë komponentët e sofistikuar janë projektuar për jetëgjatësi. Ju mund ta mbani kontrolluesin në një kuti në të cilën kontrolluesi mund të ngarkohet gjithashtu. Konsolat Xbox One mund të lidhen duke përdorur teknologjinë wireless Xbox ose kabllon USB-C të përfshirë dhe mund të lidhen me kompjuterët që funksionojnë Windows 7 e më vonë me Bluetooth ose një kabllo USB-C.",
                    Price = 16300,
                    PictureUrl = "/images/products/pr6.png",
                    Brand = "Xbox",
                    Type = "Controller",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Kontroller Sony PS5 DualSense",
                    Description =
                        "Ky kontroller me wireless është dizajnuar për PS5. Ka panel prekës dhe përgjigje haptike. Dizajni është ergonomik dhe karikohet përmes konektorit USB-C. Kapaciteti i baterisë është shumë i lartë.",
                    Price = 10500,
                    PictureUrl = "/images/products/pr7.png",
                    Brand = "Playstation",
                    Type = "Controller",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Kontroller Sony PS4, DualShock 4 v2",
                    Description =
                        "Ky kontroller me wireless është dizajnuar për PS4. Ka panel prekës dhe përgjigje haptike. Dizajni është ergonomik dhe karikohet përmes konektorit USB-C. Kapaciteti i baterisë është shumë i lartë.",
                    Price = 9200,
                    PictureUrl = "/images/products/pr8.png",
                    Brand = "Playstation",
                    Type = "Controller",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Maus Logitech G Pro X Superlight",
                    Description =
                        "Ky maus për lojëra posedon bateri me jetëgjatësi deri në 70 orë, rezolucion prej 100 - 25,400 DPI dhe përgjigje prej 1 ms. Për më tepër, mausi ka 5 butona, si dhe një memorje të integruar dhe një sensor HERO 25K.",
                    Price = 12000,
                    PictureUrl = "/images/products/pr9.png",
                    Brand = "Logitech",
                    Type = "Mouse",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Maus Logitech G Pro Wireless",
                    Description =
                        "Logitech G Pro Wireless është maus pa kabllo i cili shoqëron çdo lojtar drejt fitoreve me precizitetin dhe ndjeshmërinë e lartë të tij. Aksesori është i pajisur me senzorin 16K G Hero me shpejtësi reagimi prej 1ms, është pajisur me drita RGB të cilat mund t'i ndryshoni nëpërmjet softuerit LGS (Logitech Gaming Software) si dhe vjen me ngjyrë të zezë.",
                    Price = 9000,
                    PictureUrl = "/images/products/pr10.png",
                    Brand = "Logitech",
                    Type = "Mouse",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Monitor ZOWIE by BenQ XL2540K",
                    Description =
                        "Zowie by Benq XL2540K është një monitor i lojërave që do t’ju tërheqë menjëherë mbi të gjitha me një kohë të shkëlqyeshme përgjigjeje prej 1 ms dhe një ritëm të pakrahasueshëm të rifreskimit prej 240 Hz. Falë kësaj, ju mund të prisni një imazh krejtësisht të qartë dhe të lëmuar edhe në lojërat më të shpejta të veprimit dhe, natyrisht, në punën e përditshme. Monitori i lojrave ZOWIE by BenQ XL2540K ofron diagonale 24.5 \" dhe rezolucion FHD 1920 x 1080 piksel. Paneli TN, raporti i aspektit 16: 9, shkalla e rifreskimit 240 Hz, koha e përgjigjes 1 ms, kontrasti 1000: 1, shkëlqimi 320 cd / m jas. Mbështetje Vesa 100 x 100 mm. Lidhshmëri me lidhës 3x HDMI 2.0, dalje DP dhe kufje. Dizajn funksional. I pozicionueshëm duke përfshirë PIVOT. Teknologji eQualizer e zezë. Monitori përmban teknologjitë e mbrojtjes së syve si flicker-free dhe filtër i dritës blu. Përmasat janë 521 x 571 x 200 mm. Pesha 6.1 kg.",
                    Price = 33000,
                    PictureUrl = "/images/products/pr11.png",
                    Brand = "Benq",
                    Type = "Monitor",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Kufje HyperX Cloud II",
                    Description =
                        "Dizajni më i popullarizuar i kufjeve për lojtarët. Madhësia optimale e kupave dhe përfundimi i tyre i butë i bëjnë shumë të përshtatshme. Diametri i madh i tyre (53 mm) të klasit të lartë siguron riprodhimin perfekt të tingujve deri në 25,000Hz. Kufjet kanë ngjyrë të kuqe, me mbulesë të zezë. Gjatësia optimale e kabllos 1 m dhe cilësia e lartë e prodhimit të tij sigurojnë rehati gjatë lojës, si dhe mikrofoni i klasit të lartë që ndahet. Kanë lidhës USB, 3.5 mm mini jack dhe diapazon të gjerë frekuence. Pesha 320 g. Kufjet kanë ndjeshmëri 98 dB / mW dhe rezistencë 60 ohms.",
                    Price = 9000,
                    PictureUrl = "/images/products/pr12.png",
                    Brand = "HyperX",
                    Type = "Headphones",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "MausPad SteelSeries QcK Heavy, XXL",
                    Description =
                        "SteelSeries QcK+ është mousepad me kualitet të lartë. Produkti vjen me madhësi të madhe, ndërsa target i ka lojtarët e video-lojërave FPS. Ky mousepad është i qëndrueshëm, ndërsa mund të paloset dhe ta merrni me vete kudo. Është ideal për ndjeshmëri të vogël dhe sipërfaqe të lëmuar.Dimensionet e tij janë 900 x 400 x 4 mm.",
                    Price = 5000,
                    PictureUrl = "/images/products/pr13.png",
                    Brand = "Steelseries",
                    Type = "Mousepad",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Monitor Dell Alienware AW2521H",
                    Description =
                        "Monitori me dritë të pasme LED dhe panel IPS ka një diagonale 25 \", rezolucion Full HD prej 1920 x 1080 px, shkëlqim 400 cd / m2 dhe raport të pamjes 16: 9. Koha e përgjigjes është 1 ms, shpejtësia e rifreskimit 360 Hz, këndet e shikimit janë 178 ° horizontalisht dhe vertikalisht, ndërsa raporti i kontrastit është 1000: 1. Monitori ofron lidhësit: 5x USB 3.2, 2x HDMI, DP 1.4. Përmasat e tij janë: 556 x 251 x 528 mm.",
                    Price = 48000,
                    PictureUrl = "/images/products/pr14.png",
                    Brand = "Alienware",
                    Type = "Monitor",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Monitor AOC 24G2ZU",
                    Description =
                        "Monitor i lojërave 23.8 \"IPS me rezolucion Full HD 1920x1080, shpejtësi rifreskimi 240 Hz, kohë përgjigjeje 0.5 ms, raporti i pamjes 16: 9, shkëlqim 350 ms, kënde shikimi 170/160 °. Ka një dizajn pa kornizë. Përfshin lidhësit DisplayPort 1. 2.0, USB 3.2, pivot, altoparlant 2 x 2 W. Përmasat 505 x 539 x 227 mm, pesha 5.03 kg.Monitori mbështet VESA 100 x 100. Përfshin kabllo DisplayPort dhe HDMI. Klasa e energjisë F.",
                    Price = 18999,
                    PictureUrl = "/images/products/pr15.png",
                    Brand = "AOC",
                    Type = "Monitor",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Monitor ASUS Gaming VG249Q",
                    Description =
                        "Monitori ASUS Gaming VG249Q është i dizajnuar posaçërisht për të apasionuar të lojërave që nuk duan të humbasin asnjë detaj. Ky monitor vjen me një diagonale prej 23.8\" me kualitet Full HD dhe rezolucion 1920 x 1080, me të cilin shfaq imazhe superiore me ngjyra të ndezura dhe tejet reale, me altoparlantë të integruar që ju mundësojnë që të përjetoni çdo goditje e lëvizje sikurse të ishit me të vërtet aty. Gjithashtu, ky monitor ka teknologjitë si FreeSync, IPS, Reduktimi i dritës blu dhe Flicker Free. Veçanti të këtij monitori janë edhe mundësitë e lidhjes me kompjuter dhe konzola të ndryshme përmes porteve HDMI, DisplayPort, VGA dhe 3.5mm.",
                    Price = 25000,
                    PictureUrl = "/images/products/pr16.png",
                    Brand = "ASUS",
                    Type = "Monitor",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Kufje Logitech G Pro X",
                    Description = "Kufje cilësore për lojëra me mikrofon Logitech G Pro X të cilat ju sjellin rehati të vërtetë, ndërtim të lehtë dhe fuqi me një interval frekuencash 20-20 000 kHz nga rezistenca prej 35 ohms dhe një ndjeshmëri prej 91,7 db SPL. Teknologjia e mikrofonit BLUE VO! CE ofron një gamë të filtrave të zërit në kohë reale për të zvogëluar zhurmën, shtuar kompresimin dhe për të zvogëluar depërtimin e sibilancës. Zëri juaj do të jetë gjithmonë tingëllues, i pastër dhe profesional. Pro X janë prej alumini dhe çeliku të fortë dhe të lehta, të cilat ofrojnë qëndrueshmëri, rehati dhe estetikë të patejkalueshme.",
                    Price = 12000,
                    PictureUrl = "/images/products/pr17.png",
                    Brand = "Logitech",
                    Type = "Headphones",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Kufje SteelSeries Arctis Prime",
                    Description =
                        "Argëtohuni gjatë lojërave tuaja me këto kufje që kanë tipare teknologjike të përsosura për performancë ideale. Transmetuesit kanë madhësi 40 mm dhe mikrofoni i integruar rregullohet sipas nevojës. Frekuenca varon nga 10 Hz - 40 kHz. Përputhen me platformat: PC, PS4, PS5, Switch, Xbox Series, XONE.",
                    Price = 18000,
                    PictureUrl = "/images/products/pr18.png",
                    Brand = "Steelseries",
                    Type = "Headphones",
                    QuantityInStock = 100
                },   
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}

