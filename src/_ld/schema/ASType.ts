interface MappingRaw {
  [k: string]: 0|MappingRaw;
}
const mappingRaw: MappingRaw = {
  Article: {
    NewsArticle: {
      AnalysisNewsArticle:0, AskPublicNewsArticle:0, BackgroundNewsArticle:0,
      OpinionNewsArticle:0, ReportageNewsArticle:0, ReviewNewsArticle:0
    },
    Report:0,
    SatiricalArticle:0,
    ScholarlyArticle: { MedicalScholarlyArticle:0 },
    SocialMediaPosting: { BlogPosting: { LiveBlogPosting:0 } },
    TechArticle: { APIReference:0 },
    AdvertiserContentArticle:0
  },
  Audio: {
    MusicComposition:0,
    MusicRecording:0,
    Clip: { RadioClip:0 },
    Episode: { RadioEpisode:0, PodcastEpisode:0 }
  },
  Document: {
    DigitalDocument: {
      NoteDigitalDocument:0, PresentationDigitalDocument:0,
      SpreadsheetDigitalDocument:0, TextDigitalDocument:0
    }
  },
  Event: {
    BusinessEvent:0,
    ChildrensEvent:0,
    ComedyEvent:0,
    CourseInstance:0,
    DanceEvent:0,
    DeliveryEvent:0,
    EducationEvent:0,
    EventSeries:0,
    ExhibitionEvent:0,
    Festival:0,
    FoodEvent:0,
    Hackathon:0,
    LiteraryEvent:0,
    MusicEvent:0,
    PublicationEvent: { BroadcastEvent:0, OnDemandEvent:0 },
    SaleEvent:0,
    ScreeningEvent:0,
    SocialEvent:0,
    SportsEvent:0,
    TheaterEvent:0,
    UserInteraction: {
      UserBlocks:0, UserCheckins:0, UserComments:0, UserDownloads:0, UserLikes:0,
      UserPageVisits:0, UserPlays:0, UserPlusOnes:0, UserTweets:0
    },
    VisualArtsEvent:0
  },
  Image: {
    Photograph:0,
    Painting:0,
    Drawing:0,
    Poster:0,
    VisualArtwork: { CoverArt:0, ComicCoverArt:0 }
  },
  Note: {
    SocialMediaPosting: { BlogPosting: { LiveBlogPosting:0 }, DiscussionForumPosting:0 },
    Comment: { Answer: 0, CorrectionComment: 0 },
    HowTo: { Recipe:0 },
    HowToDirection:0,
    HowToSection:0,
    HowToStep:0,
    HowToTip:0,
    Manuscript:0
  },
  Page: {
    AboutPage:0,
    Blog:0,
    CheckoutPage:0,
    CollectionPage: { MediaGallery: { ImageGallery:0, VideoGallery:0 } },
    ContactPage:0,
    FAQPage:0,
    ItemPage:0,
    MedicalWebPage:0,
    ProfilePage:0,
    QAPage:0,
    RealEstateListing:0,
    SearchResultsPage:0,
    WebSite:0,
    WebPageElement: { SiteNavigationElement:0, Table:0, WPAdBlock:0, WPFooter:0, WPHeader:0, WPSideBar:0 }
  },
  Place: {
    VirtualLocation:0,
    Accommodation: {
      Apartment:0,
      CampingPitch:0,
      House: { SingleFamilyResidence:0 },
      Room: { HotelRoom:0, MeetingRoom:0 },
      Suite:0
    },
    AdministrativeArea: {
      City:0,
      Country:0,
      SchoolDistrict:0,
      State:0
    },
    CivicStructure: {
      Airport:0,
      Aquarium:0,
      Beach:0,
      BoatTerminal:0,
      Bridge:0,
      BusStation:0,
      BusStop:0,
      Campground:0,
      Cemetery:0,
      Crematorium:0,
      EducationalOrganization:0,
      EventVenue:0,
      FireStation:0,
      GovernmentBuilding: { CityHall:0, Courthouse:0, DefenceEstablishment:0, Embassy:0, LegislativeBuilding:0 },
      Hospital:0,
      MovieTheater:0,
      Museum:0,
      MusicVenue:0,
      Park:0,
      ParkingFacility:0,
      PerformingArtsTheater:0,
      PlaceOfWorship: { BuddhistTemple:0, Church:0, CatholicChurch:0, HinduTemple:0, Mosque:0, Synagogue:0 },
      Playground:0,
      PoliceStation:0,
      PublicToilet:0,
      RVPark:0,
      StadiumOrArena:0,
      SubwayStation:0,
      TaxiStand:0,
      TrainStation:0,
      Zoo:0
    },
    Landform: {
      BodyOfWater: {
        Canal:0,
        LakeBodyOfWater:0,
        OceanBodyOfWater:0,
        Pond:0,
        Reservoir:0,
        RiverBodyOfWater:0,
        SeaBodyOfWater:0,
        Waterfall:0
      },
      Continent:0,
      Mountain:0,
      Volcano:0
    },
    LandmarksOrHistoricalBuildings:0,
    LocalBusiness: {
      Residence: { ApartmentComplex:0, GatedResidenceCommunity:0 }
    },
    TouristAttraction:0,
    TouristDestination:0
  },
  Video: {
    Movie:0,
    Clip: { MovieClip:0, TVClip:0, VideoGameClip:0 },
    Episode: { TVEpisode:0 }
  },

  Application: {
    SoftwareApplication: { WebApplication:0, MobileApplication:0, VideoGame:0 }
  },
  Group: {
    NGO:0,
    PerformingGroup: { DanceGroup:0, MusicGroup:0, TheaterGroup:0 },
    Project: { ResearchProject:0, FundingAgency:0 },
    ResearchOrganization:0,
    SportsOrganization:0,
    SportsTeam:0,
    WorkersUnion:0
  },
  Organization: {
    Airline:0,
    Consortium:0,
    Corporation:0,
    EducationalOrganization: {
      CollegeOrUniversity:0,
      ElementarySchool:0,
      HighSchool:0,
      MiddleSchool:0,
      Preschool:0,
      School:0
    },
    FundingScheme:0,
    GovernmentOrganization:0,
    LibrarySystem:0,
    LocalBusiness: {
      AnimalShelter:0,
      ArchiveOrganization:0,
      AutomotiveBusiness: {
        AutoBodyShop:0, AutoDealer:0, AutoPartsStore:0, AutoRental:0, AutoRepair:0,
        AutoWash:0, GasStation:0, MotorcycleDealer:0, MotorcycleRepair:0
      },
      ChildCare:0,
      Dentist:0,
      DryCleaningOrLaundry:0,
      EmergencyService: {
        FireStation:0,
        Hospital:0,
        PoliceStation:0
      },
      EmploymentAgency:0,
      EntertainmentBusiness: {
        AdultEntertainment:0,
        AmusementPark:0,
        ArtGallery:0,
        Casino:0,
        ComedyClub:0,
        MovieTheater:0,
        NightClub:0
      },
      FinancialService: {
        AccountingService:0,
        AutomatedTeller:0,
        BankOrCreditUnion:0,
        InsuranceAgency:0
      },
      FoodEstablishment: {
        Bakery:0,
        BarOrPub:0,
        Brewery:0,
        CafeOrCoffeeShop:0,
        Distillery:0,
        FastFoodRestaurant:0,
        IceCreamShop:0,
        Restaurant:0,
        Winery:0
      },
      GovernmentOffice:0,
      PostOffice:0,
      HealthAndBeautyBusiness: {
        BeautySalon:0,
        DaySpa:0,
        HairSalon:0,
        HealthClub:0,
        NailSalon:0,
        TattooParlor:0
      },
      HomeAndConstructionBusiness: {
        Electrician:0,
        GeneralContractor:0,
        HVACBusiness:0,
        HousePainter:0,
        Locksmith:0,
        MovingCompany:0,
        Plumber:0,
        RoofingContractor:0
      },
      InternetCafe:0,
      LegalService: { Attorney:0, Notary:0 },
      Library:0,
      LodgingBusiness: {
        BedAndBreakfast:0,
        Campground:0,
        Hostel:0,
        Hotel:0,
        Motel:0,
        Resort:0,
        SkiResort:0
      },
      MedicalBusiness: {
        CommunityHealth:0,
        Dentist:0,
        Dermatology:0,
        DietNutrition:0,
        Emergency:0,
        Geriatric:0,
        Gynecologic:0,
        MedicalClinic:0,
        CovidTestingFacility:0,
        Midwifery:0,
        Nursing:0,
        Obstetric:0,
        Oncologic:0,
        Optician:0,
        Optometric:0,
        Otolaryngologic:0,
        Pediatric:0,
        Pharmacy:0,
        Physician:0,
        Physiotherapy:0,
        PlasticSurgery:0,
        Podiatric:0,
        PrimaryCare:0,
        Psychiatric:0,
        PublicHealth:0
      },
      ProfessionalService:0,
      RadioStation:0,
      RealEstateAgent:0,
      RecyclingCenter:0,
      SelfStorage:0,
      ShoppingCenter:0,
      SportsActivityLocation: {
        BowlingAlley:0,
        ExerciseGym:0,
        GolfCourse:0,
        HealthClub:0,
        PublicSwimmingPool:0,
        SkiResort:0,
        SportsClub:0,
        StadiumOrArena:0,
        TennisComplex:0,
      },
      Store: {
        AutoPartsStore:0,
        BikeStore:0,
        BookStore:0,
        ClothingStore:0,
        ComputerStore:0,
        ConvenienceStore:0,
        DepartmentStore:0,
        ElectronicsStore:0,
        Florist:0,
        FurnitureStore:0,
        GardenStore:0,
        GroceryStore:0,
        HardwareStore:0,
        HobbyShop:0,
        HomeGoodsStore:0,
        JewelryStore:0,
        LiquorStore:0,
        MensClothingStore:0,
        MobilePhoneStore:0,
        MovieRentalStore:0,
        MusicStore:0,
        OfficeEquipmentStore:0,
        OutletStore:0,
        PawnShop:0,
        PetStore:0,
        ShoeStore:0,
        SportingGoodsStore:0,
        TireShop:0,
        ToyStore:0,
        WholesaleStore:0
      },
      TelevisionStation:0,
      TouristInformationCenter:0,
      TravelAgency:0
    },
    MedicalOrganization: {
      Dentist:0,
      DiagnosticLab:0,
      Hospital:0,
      MedicalClinic:0,
      Pharmacy:0,
      Physician:0,
      VeterinaryCare:0
    },
    NewsMediaOrganization:0
  },
  Person: { Patient:0 },
  Service: {
    WebAPI:0,
    ProfessionalService:0,
    BroadcastService: { RadioBroadcastService:0 },
    CableOrSatelliteService:0,
    FinancialProduct: {
      BankAccount:0, DepositAccount:0, CurrencyConversionService:0, InvestmentOrDeposit:0,
      BrokerageAccount:0, InvestmentFund:0, LoanOrCredit:0, CreditCard:0,
      MortgageLoan:0, PaymentCard:0, PaymentService:0
    },
    FoodService:0,
    GovernmentService:0,
    Taxi:0,
    TaxiService:0,
    ServiceChannel:0
  }
}
