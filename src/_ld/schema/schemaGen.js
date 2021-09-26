const schemaChildren = [

  {

  "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Thing",  "description": "An action performed by a direct agent and indirect participants upon a direct object...",
  "name": "Action",
  "@id": "schema:Action",
  "layer": "core",
  "children":
    [

      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Action",  "description": "The act of accomplishing something via previous efforts. It is an instantaneous action rather than an ongoing process.",
      "name": "AchieveAction",
      "@id": "schema:AchieveAction",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AchieveAction",  "description": "The act of being defeated in a competitive activity.",
          "name": "LoseAction",
          "@id": "schema:LoseAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AchieveAction",  "description": "The act of reaching a draw in a competitive activity.",
          "name": "TieAction",
          "@id": "schema:TieAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AchieveAction",  "description": "The act of achieving victory in a competitive activity.",
          "name": "WinAction",
          "@id": "schema:WinAction",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Action",  "description": "The act of forming one's opinion, reaction or sentiment.",
      "name": "AssessAction",
      "@id": "schema:AssessAction",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AssessAction",  "description": "The act of expressing a preference from a set of options or a large or unbounded set of choices/options.",
          "name": "ChooseAction",
          "@id": "schema:ChooseAction",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ChooseAction",  "description": "The act of expressing a preference from a fixed/finite/structured set of choices/options.",
              "name": "VoteAction",
              "@id": "schema:VoteAction",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AssessAction",  "description": "The act of intentionally disregarding the object. An agent ignores an object.",
          "name": "IgnoreAction",
          "@id": "schema:IgnoreAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AssessAction",  "description": "The act of responding instinctively and emotionally to an object, expressing a sentiment.",
          "name": "ReactAction",
          "@id": "schema:ReactAction",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ReactAction",  "description": "The act of expressing a consistency of opinion with the object...",
              "name": "AgreeAction",
              "@id": "schema:AgreeAction",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ReactAction",  "description": "The act of expressing a difference of opinion with the object...",
              "name": "DisagreeAction",
              "@id": "schema:DisagreeAction",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ReactAction",  "description": "The act of expressing a negative sentiment about the object. An agent dislikes an object (a proposition, topic or theme) with participants.",
              "name": "DislikeAction",
              "@id": "schema:DislikeAction",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ReactAction",  "description": "An agent approves/certifies/likes/supports/sanction an object.",
              "name": "EndorseAction",
              "@id": "schema:EndorseAction",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ReactAction",  "description": "The act of expressing a positive sentiment about the object. An agent likes an object (a proposition, topic or theme) with participants.",
              "name": "LikeAction",
              "@id": "schema:LikeAction",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ReactAction",  "description": "The act of expressing a desire about the object. An agent wants an object.",
              "name": "WantAction",
              "@id": "schema:WantAction",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AssessAction",  "description": "The act of producing a balanced opinion about the object for an audience...",
          "name": "ReviewAction",
          "@id": "schema:ReviewAction",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Action",  "description": "The act of ingesting information/resources/food.",
      "name": "ConsumeAction",
      "@id": "schema:ConsumeAction",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ConsumeAction",  "description": "The act of swallowing liquids.",
          "name": "DrinkAction",
          "@id": "schema:DrinkAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ConsumeAction",  "description": "The act of swallowing solid objects.",
          "name": "EatAction",
          "@id": "schema:EatAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ConsumeAction",  "description": "The act of installing an application.",
          "name": "InstallAction",
          "@id": "schema:InstallAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ConsumeAction",  "description": "The act of consuming audio content.",
          "name": "ListenAction",
          "@id": "schema:ListenAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ConsumeAction",  "description": "The act of consuming written content.",
          "name": "ReadAction",
          "@id": "schema:ReadAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ConsumeAction",  "description": "The act of applying an object to its intended purpose.",
          "name": "UseAction",
          "@id": "schema:UseAction",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:UseAction",  "description": "The act of dressing oneself in clothing.",
              "name": "WearAction",
              "@id": "schema:WearAction",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ConsumeAction",  "description": "The act of consuming static visual content.",
          "name": "ViewAction",
          "@id": "schema:ViewAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ConsumeAction",  "description": "The act of consuming dynamic/moving visual content.",
          "name": "WatchAction",
          "@id": "schema:WatchAction",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Action",  "description": "An agent controls a device or application.",
      "name": "ControlAction",
      "@id": "schema:ControlAction",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ControlAction",  "description": "The act of starting or activating a device or application (e...",
          "name": "ActivateAction",
          "@id": "schema:ActivateAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ControlAction",  "description": "The act of stopping or deactivating a device or application (e...",
          "name": "DeactivateAction",
          "@id": "schema:DeactivateAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ControlAction",  "description": "The act of resuming a device or application which was formerly paused (e...",
          "name": "ResumeAction",
          "@id": "schema:ResumeAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ControlAction",  "description": "The act of momentarily pausing a device or application (e.g. pause music playback or pause a timer).",
          "name": "SuspendAction",
          "@id": "schema:SuspendAction",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Action",  "description": "The act of deliberately creating/producing/generating/building a result out of the agent.",
      "name": "CreateAction",
      "@id": "schema:CreateAction",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreateAction",  "description": "The act of producing/preparing food.",
          "name": "CookAction",
          "@id": "schema:CookAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreateAction",  "description": "The act of producing a visual/graphical representation of an object, typically with a pen/pencil and paper as instruments.",
          "name": "DrawAction",
          "@id": "schema:DrawAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreateAction",  "description": "The act of capturing sound and moving images on film, video, or digitally.",
          "name": "FilmAction",
          "@id": "schema:FilmAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreateAction",  "description": "The act of producing a painting, typically with paint and canvas as instruments.",
          "name": "PaintAction",
          "@id": "schema:PaintAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreateAction",  "description": "The act of capturing still images of objects using a camera.",
          "name": "PhotographAction",
          "@id": "schema:PhotographAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreateAction",  "description": "The act of authoring written creative content.",
          "name": "WriteAction",
          "@id": "schema:WriteAction",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Action",  "description": "The act of finding an object.Related actions:SearchAction: FindAction is generally lead by a SearchAction, but not necessarily.",
      "name": "FindAction",
      "@id": "schema:FindAction",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:FindAction",  "description": "An agent inspects/determines/investigates/inquire or examine an object's accuracy/quality/condition or state.",
          "name": "CheckAction",
          "@id": "schema:CheckAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:FindAction",  "description": "The act of discovering/finding an object.",
          "name": "DiscoverAction",
          "@id": "schema:DiscoverAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:FindAction",  "description": "An agent tracks an object for updates.Related actions:FollowAction: Unlike FollowAction, TrackAction refers to the interest on the location of innanimates objects...",
          "name": "TrackAction",
          "@id": "schema:TrackAction",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Action",  "description": "The act of interacting with another person or organization.",
      "name": "InteractAction",
      "@id": "schema:InteractAction",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:InteractAction",  "description": "The act of forming a personal connection with someone (object) mutually/bidirectionally/symmetrically...",
          "name": "BefriendAction",
          "@id": "schema:BefriendAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:InteractAction",  "description": "The act of conveying information to another person via a communication medium (instrument) such as speech, email, or telephone conversation.",
          "name": "CommunicateAction",
          "@id": "schema:CommunicateAction",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CommunicateAction",  "description": "The act of posing a question / favor to someone.Related actions:ReplyAction: Appears generally as a response to AskAction.",
              "name": "AskAction",
              "@id": "schema:AskAction",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CommunicateAction",  "description": "The act of an agent communicating (service provider, social media, etc) their arrival by registering/confirming for a previously reserved service (e...",
              "name": "CheckInAction",
              "@id": "schema:CheckInAction",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CommunicateAction",  "description": "The act of an agent communicating (service provider, social media, etc) their departure of a previously reserved service (e...",
              "name": "CheckOutAction",
              "@id": "schema:CheckOutAction",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CommunicateAction",  "description": "The act of generating a comment about a subject.",
              "name": "CommentAction",
              "@id": "schema:CommentAction",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CommunicateAction",  "description": "The act of notifying someone of information pertinent to them, with no expectation of a response.",
              "name": "InformAction",
              "@id": "schema:InformAction",
              "layer": "core",
              "children":
                [

                  {

                  "@type": "rdfs:Class", "rdfs:subClassOf": "schema:InformAction",  "description": "The act of notifying someone that a future event/action is going to happen as expected...",
                  "name": "ConfirmAction",
                  "@id": "schema:ConfirmAction",
                  "layer": "core"

                  },


                  {

                  "@type": "rdfs:Class", "rdfs:subClassOf": "schema:InformAction",  "description": "The act of notifying an event organizer as to whether you expect to attend the event.",
                  "name": "RsvpAction",
                  "@id": "schema:RsvpAction",
                  "layer": "core"

                  }

                ]

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CommunicateAction",  "description": "The act of asking someone to attend an event. Reciprocal of RsvpAction.",
              "name": "InviteAction",
              "@id": "schema:InviteAction",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CommunicateAction",  "description": "The act of responding to a question/message asked/sent by the object...",
              "name": "ReplyAction",
              "@id": "schema:ReplyAction",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CommunicateAction",  "description": "The act of distributing content to people for their amusement or edification.",
              "name": "ShareAction",
              "@id": "schema:ShareAction",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:InteractAction",  "description": "The act of forming a personal connection with someone/something (object) unidirectionally/asymmetrically to get updates polled from...",
          "name": "FollowAction",
          "@id": "schema:FollowAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:InteractAction",  "description": "An agent joins an event/group with participants/friends at a location...",
          "name": "JoinAction",
          "@id": "schema:JoinAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:InteractAction",  "description": "An agent leaves an event / group with participants/friends at a location...",
          "name": "LeaveAction",
          "@id": "schema:LeaveAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:InteractAction",  "description": "The act of marrying a person.",
          "name": "MarryAction",
          "@id": "schema:MarryAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:InteractAction",  "description": "The act of registering to be a user of a service, product or web page...",
          "name": "RegisterAction",
          "@id": "schema:RegisterAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:InteractAction",  "description": "The act of forming a personal connection with someone/something (object) unidirectionally/asymmetrically to get updates pushed to...",
          "name": "SubscribeAction",
          "@id": "schema:SubscribeAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:InteractAction",  "description": "The act of un-registering from a service.Related actions:RegisterAction: antonym of UnRegisterAction...",
          "name": "UnRegisterAction",
          "@id": "schema:UnRegisterAction",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Action",  "description": "The act of an agent relocating to a place.Related actions:TransferAction: Unlike TransferAction, the subject of the move is a living Person or Organization rather than an inanimate object.",
      "name": "MoveAction",
      "@id": "schema:MoveAction",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MoveAction",  "description": "The act of arriving at a place. An agent arrives at a destination from an fromLocation, optionally with participants.",
          "name": "ArriveAction",
          "@id": "schema:ArriveAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MoveAction",  "description": "The act of  departing from a place. An agent departs from an fromLocation for a destination, optionally with participants.",
          "name": "DepartAction",
          "@id": "schema:DepartAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MoveAction",  "description": "The act of traveling from an fromLocation to a destination by a specified mode of transport, optionally with participants.",
          "name": "TravelAction",
          "@id": "schema:TravelAction",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Action",  "description": "The act of manipulating/administering/supervising/controlling one or more objects.",
      "name": "OrganizeAction",
      "@id": "schema:OrganizeAction",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:OrganizeAction",  "description": "The act of organizing tasks/objects/events by associating resources to it.",
          "name": "AllocateAction",
          "@id": "schema:AllocateAction",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AllocateAction",  "description": "The act of committing to/adopting an object.Related actions:RejectAction: The antonym of AcceptAction.",
              "name": "AcceptAction",
              "@id": "schema:AcceptAction",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AllocateAction",  "description": "The act of allocating an action/event/task to some destination (someone or something).",
              "name": "AssignAction",
              "@id": "schema:AssignAction",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AllocateAction",  "description": "The act of granting permission to an object.",
              "name": "AuthorizeAction",
              "@id": "schema:AuthorizeAction",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AllocateAction",  "description": "The act of rejecting to/adopting an object.Related actions:AcceptAction: The antonym of RejectAction.",
              "name": "RejectAction",
              "@id": "schema:RejectAction",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:OrganizeAction",  "description": "The act of registering to an organization/service without the guarantee to receive it...",
          "name": "ApplyAction",
          "@id": "schema:ApplyAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:OrganizeAction",  "description": "An agent bookmarks/flags/labels/tags/marks an object.",
          "name": "BookmarkAction",
          "@id": "schema:BookmarkAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:OrganizeAction",  "description": "The act of planning the execution of an event/task/action/reservation/plan to a future date.",
          "name": "PlanAction",
          "@id": "schema:PlanAction",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PlanAction",  "description": "The act of asserting that a future event/action is no longer going to happen...",
              "name": "CancelAction",
              "@id": "schema:CancelAction",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PlanAction",  "description": "Reserving a concrete object.Related actions:ScheduleAction: Unlike ScheduleAction, ReserveAction reserves concrete objects (e...",
              "name": "ReserveAction",
              "@id": "schema:ReserveAction",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PlanAction",  "description": "Scheduling future actions, events, or tasks.Related actions:ReserveAction: Unlike ReserveAction, ScheduleAction allocates future actions (e...",
              "name": "ScheduleAction",
              "@id": "schema:ScheduleAction",
              "layer": "core"

              }

            ]

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Action",  "description": "The act of playing/exercising/training/performing for enjoyment, leisure, recreation, Competition or exercise...",
      "name": "PlayAction",
      "@id": "schema:PlayAction",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PlayAction",  "description": "The act of participating in exertive activity for the purposes of improving health and fitness.",
          "name": "ExerciseAction",
          "@id": "schema:ExerciseAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PlayAction",  "description": "The act of participating in performance arts.",
          "name": "PerformAction",
          "@id": "schema:PerformAction",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Action",  "description": "The act of searching for an object.Related actions:FindAction: SearchAction generally leads to a FindAction, but not necessarily.",
      "name": "SearchAction",
      "@id": "schema:SearchAction",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Action",  "description": "The act of participating in an exchange of goods and services for monetary compensation...",
      "name": "TradeAction",
      "@id": "schema:TradeAction",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:TradeAction",  "description": "The act of giving money to a seller in exchange for goods or services rendered...",
          "name": "BuyAction",
          "@id": "schema:BuyAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:TradeAction",  "description": "The act of providing goods, services, or money without compensation, often for philanthropic reasons.",
          "name": "DonateAction",
          "@id": "schema:DonateAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:TradeAction",  "description": "An agent orders an object/product/service to be delivered/sent.",
          "name": "OrderAction",
          "@id": "schema:OrderAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:TradeAction",  "description": "An agent pays a price to a participant.",
          "name": "PayAction",
          "@id": "schema:PayAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:TradeAction",  "description": "An agent quotes/estimates/appraises an object/product/service with a price at a location/store.",
          "name": "QuoteAction",
          "@id": "schema:QuoteAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:TradeAction",  "description": "The act of giving money in return for temporary use, but not ownership, of an object such as a vehicle or property...",
          "name": "RentAction",
          "@id": "schema:RentAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:TradeAction",  "description": "The act of taking money from a buyer in exchange for goods or services rendered...",
          "name": "SellAction",
          "@id": "schema:SellAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:TradeAction",  "description": "The act of giving money voluntarily to a beneficiary in recognition of services rendered.",
          "name": "TipAction",
          "@id": "schema:TipAction",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Action",  "description": "The act of transferring/moving (abstract or concrete) animate or inanimate objects from one place to another.",
      "name": "TransferAction",
      "@id": "schema:TransferAction",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:TransferAction",  "description": "The act of obtaining an object under an agreement to return it at a later date...",
          "name": "BorrowAction",
          "@id": "schema:BorrowAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:TransferAction",  "description": "The act of downloading an object.",
          "name": "DownloadAction",
          "@id": "schema:DownloadAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:TransferAction",  "description": "The act of transferring ownership of an object to a destination...",
          "name": "GiveAction",
          "@id": "schema:GiveAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:TransferAction",  "description": "The act of providing an object under an agreement that it will be returned at a later date...",
          "name": "LendAction",
          "@id": "schema:LendAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:TransferAction",  "description": "The act of physically/electronically taking delivery of an object thathas been transferred from an origin to a destination...",
          "name": "ReceiveAction",
          "@id": "schema:ReceiveAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:TransferAction",  "description": "The act of returning to the origin that which was previously received (concrete objects) or taken (ownership).",
          "name": "ReturnAction",
          "@id": "schema:ReturnAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:TransferAction",  "description": "The act of physically/electronically dispatching an object for transfer from an origin to a destination...",
          "name": "SendAction",
          "@id": "schema:SendAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:TransferAction",  "description": "The act of gaining ownership of an object from an origin. Reciprocal of GiveAction...",
          "name": "TakeAction",
          "@id": "schema:TakeAction",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Action",  "description": "The act of managing by changing/editing the state of the object.",
      "name": "UpdateAction",
      "@id": "schema:UpdateAction",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:UpdateAction",  "description": "The act of editing by adding an object to a collection.",
          "name": "AddAction",
          "@id": "schema:AddAction",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AddAction",  "description": "The act of adding at a specific location in an ordered collection.",
              "name": "InsertAction",
              "@id": "schema:InsertAction",
              "layer": "core",
              "children":
                [

                  {

                  "@type": "rdfs:Class", "rdfs:subClassOf": "schema:InsertAction",  "description": "The act of inserting at the end if an ordered collection.",
                  "name": "AppendAction",
                  "@id": "schema:AppendAction",
                  "layer": "core"

                  },


                  {

                  "@type": "rdfs:Class", "rdfs:subClassOf": "schema:InsertAction",  "description": "The act of inserting at the beginning if an ordered collection.",
                  "name": "PrependAction",
                  "@id": "schema:PrependAction",
                  "layer": "core"

                  }

                ]

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:UpdateAction",  "description": "The act of editing a recipient by removing one of its objects.",
          "name": "DeleteAction",
          "@id": "schema:DeleteAction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:UpdateAction",  "description": "The act of editing a recipient by replacing an old object with a new object.",
          "name": "ReplaceAction",
          "@id": "schema:ReplaceAction",
          "layer": "core"

          }

        ]

      }

    ]

  },


  {

  "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Thing",  "description": "The most generic kind of creative work, including books, movies, photographs, software programs, etc.",
  "name": "CreativeWork",
  "@id": "schema:CreativeWork",
  "layer": "core",
  "children":
    [

      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "An article, such as a news article or piece of investigative report...",
      "name": "Article",
      "@id": "schema:Article",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Article",  "description": "A news article.",
          "name": "NewsArticle",
          "@id": "schema:NewsArticle",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Article",  "description": "A Report generated by governmental or non-governmental organization.",
          "name": "Report",
          "@id": "schema:Report",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Article",  "description": "A scholarly article.",
          "name": "ScholarlyArticle",
          "@id": "schema:ScholarlyArticle",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ScholarlyArticle",  "description": "A scholarly article in the medical domain.",
              "name": "MedicalScholarlyArticle",
              "@id": "schema:MedicalScholarlyArticle",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Article",  "description": "A post to a social media platform, including blog posts, tweets, Facebook posts, etc.",
          "name": "SocialMediaPosting",
          "@id": "schema:SocialMediaPosting",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:SocialMediaPosting",  "description": "A blog post.",
              "name": "BlogPosting",
              "@id": "schema:BlogPosting",
              "layer": "core",
              "children":
                [

                  {

                  "@type": "rdfs:Class", "rdfs:subClassOf": "schema:BlogPosting",  "description": "A blog post intended to provide a rolling textual coverage of an ongoing event through continuous updates.",
                  "name": "LiveBlogPosting",
                  "@id": "schema:LiveBlogPosting",
                  "layer": "core"

                  }

                ]

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:SocialMediaPosting",  "description": "A posting to a discussion forum.",
              "name": "DiscussionForumPosting",
              "@id": "schema:DiscussionForumPosting",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Article",  "description": "A technical article - Example: How-to (task) topics, step-by-step, procedural troubleshooting, specifications, etc.",
          "name": "TechArticle",
          "@id": "schema:TechArticle",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:TechArticle",  "description": "Reference documentation for application programming interfaces (APIs).",
              "name": "APIReference",
              "@id": "schema:APIReference",
              "layer": "core"

              }

            ]

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A collection or bound volume of maps, charts, plates or tables, physical or in media form illustrating any subject.",
      "name": "Atlas",
      "@id": "schema:Atlas",
      "layer": "bib"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A blog.",
      "name": "Blog",
      "@id": "schema:Blog",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A book.",
      "name": "Book",
      "@id": "schema:Book",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Book",  "description": "An audiobook.",
          "name": "Audiobook",
          "@id": "schema:Audiobook",
          "layer": "bib"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "One of the sections into which a book is divided. A chapter usually has a section number or a name.",
      "name": "Chapter",
      "@id": "schema:Chapter",
      "layer": "bib"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A short TV or radio program or a segment/part of a program.",
      "name": "Clip",
      "@id": "schema:Clip",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Clip",  "description": "A short segment/part of a movie.",
          "name": "MovieClip",
          "@id": "schema:MovieClip",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Clip",  "description": "A short radio program or a segment/part of a radio program.",
          "name": "RadioClip",
          "@id": "schema:RadioClip",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Clip",  "description": "A short TV program or a segment/part of a TV program.",
          "name": "TVClip",
          "@id": "schema:TVClip",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Clip",  "description": "A short segment/part of a video game.",
          "name": "VideoGameClip",
          "@id": "schema:VideoGameClip",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "Computer programming source code. Example: Full (compile ready) solutions, code snippet samples, scripts, templates.",
      "name": "Code",
      "@id": "schema:Code",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A created collection of Creative Works or other artefacts.",
      "name": "Collection",
      "@id": "schema:Collection",
      "layer": "bib"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "The term \"story\" is any indivisible, re-printable\n\tunit of a comic, including the interior stories, covers, and backmatter...",
      "name": "ComicStory",
      "@id": "schema:ComicStory",
      "layer": "bib",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ComicStory",  "description": "The artwork on the cover of a comic.",
          "name": "ComicCoverArt",
          "@id": "schema:ComicCoverArt",
          "layer": "bib"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A comment on an item - for example, a comment on a blog post...",
      "name": "Comment",
      "@id": "schema:Comment",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Comment",  "description": "An answer offered to a question; perhaps correct, perhaps opinionated or wrong.",
          "name": "Answer",
          "@id": "schema:Answer",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A media season e.g. tv, radio, video game etc.",
      "name": "CreativeWorkSeason",
      "@id": "schema:CreativeWorkSeason",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWorkSeason",  "description": "Season dedicated to radio broadcast and associated online delivery.",
          "name": "RadioSeason",
          "@id": "schema:RadioSeason",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWorkSeason",  "description": "Season dedicated to TV broadcast and associated online delivery.",
          "name": "TVSeason",
          "@id": "schema:TVSeason",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A CreativeWorkSeries in schema.org is a group of related items, typically but not necessarily of the same kind...",
      "name": "CreativeWorkSeries",
      "@id": "schema:CreativeWorkSeries",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWorkSeries",  "description": "A series of books. Included books can be indicated with the hasPart property.",
          "name": "BookSeries",
          "@id": "schema:BookSeries",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWorkSeries",  "description": "A series of movies. Included movies can be indicated with the hasPart property.",
          "name": "MovieSeries",
          "@id": "schema:MovieSeries",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWorkSeries",  "description": "A publication in any medium issued in successive parts bearing numerical or chronological designations and intended, such as a magazine, scholarly journal, or newspaper to continue indefinitely...",
          "name": "Periodical",
          "@id": "schema:Periodical",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Periodical",  "description": "A sequential publication of comic stories under a\n\tunifying title, for example \"The Amazing Spider-Man\" or \"Groo the\n\tWanderer\".",
              "name": "ComicSeries",
              "@id": "schema:ComicSeries",
              "layer": "bib"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Periodical",  "description": "A publication containing information about varied topics that are pertinent to general information, a geographic area, or a specific subject matter (i...",
              "name": "Newspaper",
              "@id": "schema:Newspaper",
              "layer": "bib"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWorkSeries",  "description": "CreativeWorkSeries dedicated to radio broadcast and associated online delivery.",
          "name": "RadioSeries",
          "@id": "schema:RadioSeries",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWorkSeries",  "description": "CreativeWorkSeries dedicated to TV broadcast and associated online delivery.",
          "name": "TVSeries",
          "@id": "schema:TVSeries",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWorkSeries",  "description": "A video game series.",
          "name": "VideoGameSeries",
          "@id": "schema:VideoGameSeries",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A collection of datasets.",
      "name": "DataCatalog",
      "@id": "schema:DataCatalog",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A body of structured information describing some topic(s) of interest.",
      "name": "Dataset",
      "@id": "schema:Dataset",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Dataset",  "description": "A single feed providing structured information about one or more entities or topics.",
          "name": "DataFeed",
          "@id": "schema:DataFeed",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A strategy of regulating the intake of food to achieve or maintain a specific health-related goal.",
      "name": "Diet",
      "@id": "schema:Diet",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "An email message.",
      "name": "EmailMessage",
      "@id": "schema:EmailMessage",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A media episode (e.g. TV, radio, video game) which can be part of a series or season.",
      "name": "Episode",
      "@id": "schema:Episode",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Episode",  "description": "A radio episode which can be part of a series or season.",
          "name": "RadioEpisode",
          "@id": "schema:RadioEpisode",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Episode",  "description": "A TV episode which can be part of a series or season.",
          "name": "TVEpisode",
          "@id": "schema:TVEpisode",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "Fitness-related activity designed for a specific health-related purpose, including defined exercise routines as well as activity prescribed by a clinician.",
      "name": "ExercisePlan",
      "@id": "schema:ExercisePlan",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "The Game type represents things which are games. These are typically rule-governed recreational activities, e...",
      "name": "Game",
      "@id": "schema:Game",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Game",  "description": "A video game is an electronic game that involves human interaction with a user interface to generate visual feedback on a video device.",
          "name": "VideoGame",
          "@id": "schema:VideoGame",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A map.",
      "name": "Map",
      "@id": "schema:Map",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "An image, video, or audio object embedded in a web page. Note that a creative work may have many media objects associated with it on the same web page...",
      "name": "MediaObject",
      "@id": "schema:MediaObject",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MediaObject",  "description": "An audio file.",
          "name": "AudioObject",
          "@id": "schema:AudioObject",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MediaObject",  "description": "A dataset in downloadable form.",
          "name": "DataDownload",
          "@id": "schema:DataDownload",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MediaObject",  "description": "An image file.",
          "name": "ImageObject",
          "@id": "schema:ImageObject",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ImageObject",  "description": "An image of a visual machine-readable code such as a barcode or QR code.",
              "name": "Barcode",
              "@id": "schema:Barcode",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MediaObject",  "description": "A music video file.",
          "name": "MusicVideoObject",
          "@id": "schema:MusicVideoObject",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MediaObject",  "description": "A video file.",
          "name": "VideoObject",
          "@id": "schema:VideoObject",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A movie.",
      "name": "Movie",
      "@id": "schema:Movie",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A musical composition.",
      "name": "MusicComposition",
      "@id": "schema:MusicComposition",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A collection of music tracks in playlist form.",
      "name": "MusicPlaylist",
      "@id": "schema:MusicPlaylist",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MusicPlaylist",  "description": "A collection of music tracks.",
          "name": "MusicAlbum",
          "@id": "schema:MusicAlbum",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MusicPlaylist",  "description": "A MusicRelease is a specific release of a music album.",
          "name": "MusicRelease",
          "@id": "schema:MusicRelease",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A music recording (track), usually a single song.",
      "name": "MusicRecording",
      "@id": "schema:MusicRecording",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A painting.",
      "name": "Painting",
      "@id": "schema:Painting",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A photograph.",
      "name": "Photograph",
      "@id": "schema:Photograph",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A part of a successively published publication such as a periodical or publication volume, often numbered, usually containing a grouping of works such as articles...",
      "name": "PublicationIssue",
      "@id": "schema:PublicationIssue",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PublicationIssue",  "description": "Individual comic issues are serially published as\n\tpart of a larger series...",
          "name": "ComicIssue",
          "@id": "schema:ComicIssue",
          "layer": "bib"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A part of a successively published publication such as a periodical or multi-volume work, often numbered...",
      "name": "PublicationVolume",
      "@id": "schema:PublicationVolume",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A specific question - e.g. from a user seeking answers online, or collected in a Frequently Asked Questions (FAQ) document.",
      "name": "Question",
      "@id": "schema:Question",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A recipe.",
      "name": "Recipe",
      "@id": "schema:Recipe",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A review of an item - for example, of a restaurant, movie, or store.",
      "name": "Review",
      "@id": "schema:Review",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A piece of sculpture.",
      "name": "Sculpture",
      "@id": "schema:Sculpture",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A media season e.g. tv, radio, video game etc.",
      "name": "Season",
      "@id": "schema:Season",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A Series in schema.org is a group of related items, typically but not necessarily of the same kind.",
      "name": "Series",
      "@id": "schema:Series",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A software application.",
      "name": "SoftwareApplication",
      "@id": "schema:SoftwareApplication",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:SoftwareApplication",  "description": "A software application designed specifically to work well on a mobile device such as a telephone.",
          "name": "MobileApplication",
          "@id": "schema:MobileApplication",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:SoftwareApplication",  "description": "Web applications.",
          "name": "WebApplication",
          "@id": "schema:WebApplication",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "Computer programming source code. Example: Full (compile ready) solutions, code snippet samples, scripts, templates.",
      "name": "SoftwareSourceCode",
      "@id": "schema:SoftwareSourceCode",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A thesis or dissertation document submitted in support of candidature for an academic degree or professional qualification.",
      "name": "Thesis",
      "@id": "schema:Thesis",
      "layer": "bib"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A work of art that is primarily visual in character.",
      "name": "VisualArtwork",
      "@id": "schema:VisualArtwork",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:VisualArtwork",  "description": "The artwork on the outer surface of a CreativeWork.",
          "name": "CoverArt",
          "@id": "schema:CoverArt",
          "layer": "bib"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A web page. Every web page is implicitly assumed to be declared to be of type WebPage, so the various properties about that webpage, such as breadcrumb may be used...",
      "name": "WebPage",
      "@id": "schema:WebPage",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:WebPage",  "description": "Web page type: About page.",
          "name": "AboutPage",
          "@id": "schema:AboutPage",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:WebPage",  "description": "Web page type: Checkout page.",
          "name": "CheckoutPage",
          "@id": "schema:CheckoutPage",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:WebPage",  "description": "Web page type: Collection page.",
          "name": "CollectionPage",
          "@id": "schema:CollectionPage",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CollectionPage",  "description": "Web page type: Image gallery page.",
              "name": "ImageGallery",
              "@id": "schema:ImageGallery",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CollectionPage",  "description": "Web page type: Video gallery page.",
              "name": "VideoGallery",
              "@id": "schema:VideoGallery",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:WebPage",  "description": "Web page type: Contact page.",
          "name": "ContactPage",
          "@id": "schema:ContactPage",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:WebPage",  "description": "A page devoted to a single item, such as a particular product or hotel.",
          "name": "ItemPage",
          "@id": "schema:ItemPage",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:WebPage",  "description": "A web page that provides medical information.",
          "name": "MedicalWebPage",
          "@id": "schema:MedicalWebPage",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:WebPage",  "description": "Web page type: Profile page.",
          "name": "ProfilePage",
          "@id": "schema:ProfilePage",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:WebPage",  "description": "A QAPage is a WebPage focussed on a specific Question and its Answer(s), e...",
          "name": "QAPage",
          "@id": "schema:QAPage",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:WebPage",  "description": "Web page type: Search results page.",
          "name": "SearchResultsPage",
          "@id": "schema:SearchResultsPage",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A web page element, like a table or an image.",
      "name": "WebPageElement",
      "@id": "schema:WebPageElement",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:WebPageElement",  "description": "A navigation element of the page.",
          "name": "SiteNavigationElement",
          "@id": "schema:SiteNavigationElement",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:WebPageElement",  "description": "A table on a Web page.",
          "name": "Table",
          "@id": "schema:Table",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:WebPageElement",  "description": "An advertising section of the page.",
          "name": "WPAdBlock",
          "@id": "schema:WPAdBlock",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:WebPageElement",  "description": "The footer section of the page.",
          "name": "WPFooter",
          "@id": "schema:WPFooter",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:WebPageElement",  "description": "The header section of the page.",
          "name": "WPHeader",
          "@id": "schema:WPHeader",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:WebPageElement",  "description": "A sidebar section of the page.",
          "name": "WPSideBar",
          "@id": "schema:WPSideBar",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CreativeWork",  "description": "A WebSite is a set of related web pages and other items typically served from a single web domain and accessible via URLs.",
      "name": "WebSite",
      "@id": "schema:WebSite",
      "layer": "core"

      }

    ]

  },


  {

  "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Thing",  "description": "An event happening at a certain time and location, such as a concert, lecture, or festival...",
  "name": "Event",
  "@id": "schema:Event",
  "layer": "core",
  "children":
    [

      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "Event type: Business event.",
      "name": "BusinessEvent",
      "@id": "schema:BusinessEvent",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "Event type: Children's event.",
      "name": "ChildrensEvent",
      "@id": "schema:ChildrensEvent",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "Event type: Comedy event.",
      "name": "ComedyEvent",
      "@id": "schema:ComedyEvent",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "Event type: A social dance.",
      "name": "DanceEvent",
      "@id": "schema:DanceEvent",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "An event involving the delivery of an item.",
      "name": "DeliveryEvent",
      "@id": "schema:DeliveryEvent",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "Event type: Education event.",
      "name": "EducationEvent",
      "@id": "schema:EducationEvent",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "Event type: Exhibition event, e.g. at a museum, library, archive, tradeshow, ...",
      "name": "ExhibitionEvent",
      "@id": "schema:ExhibitionEvent",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "Event type: Festival.",
      "name": "Festival",
      "@id": "schema:Festival",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "Event type: Food event.",
      "name": "FoodEvent",
      "@id": "schema:FoodEvent",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "Event type: Literary event.",
      "name": "LiteraryEvent",
      "@id": "schema:LiteraryEvent",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "Event type: Music event.",
      "name": "MusicEvent",
      "@id": "schema:MusicEvent",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "A PublicationEvent corresponds indifferently to the event of publication for a CreativeWork of any type e...",
      "name": "PublicationEvent",
      "@id": "schema:PublicationEvent",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PublicationEvent",  "description": "An over the air or online broadcast event.",
          "name": "BroadcastEvent",
          "@id": "schema:BroadcastEvent",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PublicationEvent",  "description": "A publication event e.g. catch-up TV or radio podcast, during which a program is available on-demand.",
          "name": "OnDemandEvent",
          "@id": "schema:OnDemandEvent",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "Event type: Sales event.",
      "name": "SaleEvent",
      "@id": "schema:SaleEvent",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "A screening of a movie or other video.",
      "name": "ScreeningEvent",
      "@id": "schema:ScreeningEvent",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "Event type: Social event.",
      "name": "SocialEvent",
      "@id": "schema:SocialEvent",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "Event type: Sports event.",
      "name": "SportsEvent",
      "@id": "schema:SportsEvent",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "Event type: Theater performance.",
      "name": "TheaterEvent",
      "@id": "schema:TheaterEvent",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages...",
      "name": "UserInteraction",
      "@id": "schema:UserInteraction",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:UserInteraction",  "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages...",
          "name": "UserBlocks",
          "@id": "schema:UserBlocks",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:UserInteraction",  "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages...",
          "name": "UserCheckins",
          "@id": "schema:UserCheckins",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:UserInteraction",  "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages...",
          "name": "UserComments",
          "@id": "schema:UserComments",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:UserInteraction",  "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages...",
          "name": "UserDownloads",
          "@id": "schema:UserDownloads",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:UserInteraction",  "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages...",
          "name": "UserLikes",
          "@id": "schema:UserLikes",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:UserInteraction",  "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages...",
          "name": "UserPageVisits",
          "@id": "schema:UserPageVisits",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:UserInteraction",  "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages...",
          "name": "UserPlays",
          "@id": "schema:UserPlays",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:UserInteraction",  "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages...",
          "name": "UserPlusOnes",
          "@id": "schema:UserPlusOnes",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:UserInteraction",  "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages...",
          "name": "UserTweets",
          "@id": "schema:UserTweets",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Event",  "description": "Event type: Visual arts event.",
      "name": "VisualArtsEvent",
      "@id": "schema:VisualArtsEvent",
      "layer": "core"

      }

    ]

  },


  {

  "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Thing",  "description": "A utility class that serves as the umbrella for a number of 'intangible' things such as quantities, structured values, etc.",
  "name": "Intangible",
  "@id": "schema:Intangible",
  "layer": "core",
  "children":
    [

      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "An intangible item that describes an alignment between a learning resource and a node in an educational framework.",
      "name": "AlignmentObject",
      "@id": "schema:AlignmentObject",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "Intended audience for an item, i.e. the group for whom the item was created.",
      "name": "Audience",
      "@id": "schema:Audience",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Audience",  "description": "A set of characteristics belonging to businesses, e.g. who compose an item's target audience.",
          "name": "BusinessAudience",
          "@id": "schema:BusinessAudience",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Audience",  "description": "An EducationalAudience.",
          "name": "EducationalAudience",
          "@id": "schema:EducationalAudience",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Audience",  "description": "Target audiences for medical web pages. Enumerated type.",
          "name": "MedicalAudience",
          "@id": "schema:MedicalAudience",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Audience",  "description": "A set of characteristics belonging to people, e.g. who compose an item's target audience.",
          "name": "PeopleAudience",
          "@id": "schema:PeopleAudience",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PeopleAudience",  "description": "A set of characteristics describing parents, who can be interested in viewing some content.",
              "name": "ParentAudience",
              "@id": "schema:ParentAudience",
              "layer": "core"

              }

            ]

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "A brand is a name used by an organization or business person for labeling a product, product group, or similar.",
      "name": "Brand",
      "@id": "schema:Brand",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "A unique instance of a BroadcastService on a CableOrSatelliteService lineup.",
      "name": "BroadcastChannel",
      "@id": "schema:BroadcastChannel",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:BroadcastChannel",  "description": "A unique instance of a radio BroadcastService on a CableOrSatelliteService lineup.",
          "name": "RadioChannel",
          "@id": "schema:RadioChannel",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:BroadcastChannel",  "description": "A unique instance of a television BroadcastService on a CableOrSatelliteService lineup.",
          "name": "TelevisionChannel",
          "@id": "schema:TelevisionChannel",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "A trip on a commercial bus line.",
      "name": "BusTrip",
      "@id": "schema:BusTrip",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "A class, also often called a 'Type'; equivalent to rdfs:Class.",
      "name": "Class",
      "@id": "schema:Class",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "A single item within a larger data feed.",
      "name": "DataFeedItem",
      "@id": "schema:DataFeedItem",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "A demand entity represents the public, not necessarily binding, not necessarily exclusive, announcement by an organization or person to seek a certain type of goods or services...",
      "name": "Demand",
      "@id": "schema:Demand",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "An entry point, within some Web-based protocol.",
      "name": "EntryPoint",
      "@id": "schema:EntryPoint",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "Lists or enumerations&#x2014;for example, a list of cuisines or music genres, etc.",
      "name": "Enumeration",
      "@id": "schema:Enumeration",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "The status of an Action.",
          "name": "ActionStatusType",
          "@id": "schema:ActionStatusType",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "A type of boarding policy used by an airline.",
          "name": "BoardingPolicyType",
          "@id": "schema:BoardingPolicyType",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "The publication format of the book.",
          "name": "BookFormatType",
          "@id": "schema:BookFormatType",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "A business entity type is a conceptual entity representing the legal form, the size, the main line of business, the position in the value chain, or any combination thereof, of an organization or business person...",
          "name": "BusinessEntityType",
          "@id": "schema:BusinessEntityType",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "The business function specifies the type of activity or access (i...",
          "name": "BusinessFunction",
          "@id": "schema:BusinessFunction",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "Enumerated options related to a ContactPoint.",
          "name": "ContactPointOption",
          "@id": "schema:ContactPointOption",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "The day of the week, e.g. used to specify to which day the opening hours of an OpeningHoursSpecification refer...",
          "name": "DayOfWeek",
          "@id": "schema:DayOfWeek",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "A delivery method is a standardized procedure for transferring the product or service to the destination of fulfillment chosen by the customer...",
          "name": "DeliveryMethod",
          "@id": "schema:DeliveryMethod",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:DeliveryMethod",  "description": "A DeliveryMethod in which an item is made available via locker.",
              "name": "LockerDelivery",
              "@id": "schema:LockerDelivery",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:DeliveryMethod",  "description": "A private parcel service as the delivery mode available for a certain offer...",
              "name": "ParcelService",
              "@id": "schema:ParcelService",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "Enumerated categories of medical drug costs.",
          "name": "DrugCostCategory",
          "@id": "schema:DrugCostCategory",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "Categories that represent an assessment of the risk of fetal injury due to a drug or pharmaceutical used as directed by the mother during pregnancy.",
          "name": "DrugPregnancyCategory",
          "@id": "schema:DrugPregnancyCategory",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "Indicates whether this drug is available by prescription or over-the-counter.",
          "name": "DrugPrescriptionStatus",
          "@id": "schema:DrugPrescriptionStatus",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "EventStatusType is an enumeration type whose instances represent several states that an Event may be in.",
          "name": "EventStatusType",
          "@id": "schema:EventStatusType",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "Indicates whether this game is multi-player, co-op or single-player.",
          "name": "GamePlayMode",
          "@id": "schema:GamePlayMode",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "Status of a game server.",
          "name": "GameServerStatus",
          "@id": "schema:GameServerStatus",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "Classes of agents or pathogens that transmit infectious diseases...",
          "name": "InfectiousAgentClass",
          "@id": "schema:InfectiousAgentClass",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "A list of possible product availability options.",
          "name": "ItemAvailability",
          "@id": "schema:ItemAvailability",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "Enumerated for values for itemListOrder for indicating how an ordered ItemList is organized.",
          "name": "ItemListOrderType",
          "@id": "schema:ItemListOrderType",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "An enumeration of several kinds of Map.",
          "name": "MapCategoryType",
          "@id": "schema:MapCategoryType",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "Categories of medical devices, organized by the purpose or intended use of the device.",
          "name": "MedicalDevicePurpose",
          "@id": "schema:MedicalDevicePurpose",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "Enumerations related to health and the practice of medicine.",
          "name": "MedicalEnumeration",
          "@id": "schema:MedicalEnumeration",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEnumeration",  "description": "Level of evidence for a medical guideline. Enumerated type.",
              "name": "MedicalEvidenceLevel",
              "@id": "schema:MedicalEvidenceLevel",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEnumeration",  "description": "Any medical imaging modality typically used for diagnostic purposes...",
              "name": "MedicalImagingTechnique",
              "@id": "schema:MedicalImagingTechnique",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEnumeration",  "description": "Design models for observational medical studies. Enumerated type.",
              "name": "MedicalObservationalStudyDesign",
              "@id": "schema:MedicalObservationalStudyDesign",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEnumeration",  "description": "An enumeration that describes different types of medical procedures.",
              "name": "MedicalProcedureType",
              "@id": "schema:MedicalProcedureType",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEnumeration",  "description": "Any specific branch of medical science or practice. Medical specialities include clinical specialties that pertain to particular organ systems and their respective disease states, as well as allied health specialties...",
              "name": "MedicalSpecialty",
              "@id": "schema:MedicalSpecialty",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEnumeration",  "description": "The status of a medical study. Enumerated type.",
              "name": "MedicalStudyStatus",
              "@id": "schema:MedicalStudyStatus",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEnumeration",  "description": "Design models for medical trials. Enumerated type.",
              "name": "MedicalTrialDesign",
              "@id": "schema:MedicalTrialDesign",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEnumeration",  "description": "Systems of medical practice.",
              "name": "MedicineSystem",
              "@id": "schema:MedicineSystem",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEnumeration",  "description": "Categories of physical activity, organized by physiologic classification.",
              "name": "PhysicalActivityCategory",
              "@id": "schema:PhysicalActivityCategory",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEnumeration",  "description": "A type of physical examination of a patient performed by a physician...",
              "name": "PhysicalExam",
              "@id": "schema:PhysicalExam",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "Classification of the album by it's type of content: soundtrack, live album, studio album, etc.",
          "name": "MusicAlbumProductionType",
          "@id": "schema:MusicAlbumProductionType",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "The kind of release which this album is: single, EP or album.",
          "name": "MusicAlbumReleaseType",
          "@id": "schema:MusicAlbumReleaseType",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "Format of this release (the type of recording media used, ie...",
          "name": "MusicReleaseFormatType",
          "@id": "schema:MusicReleaseFormatType",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "A list of possible conditions for the item.",
          "name": "OfferItemCondition",
          "@id": "schema:OfferItemCondition",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "Enumerated status values for Order.",
          "name": "OrderStatus",
          "@id": "schema:OrderStatus",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "A payment method is a standardized procedure for transferring the monetary amount for a purchase...",
          "name": "PaymentMethod",
          "@id": "schema:PaymentMethod",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PaymentMethod",  "description": "A credit or debit card type as a standardized procedure for transferring the monetary amount for a purchase...",
              "name": "CreditCard",
              "@id": "schema:CreditCard",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "A specific payment status. For example, PaymentDue, PaymentComplete, etc.",
          "name": "PaymentStatusType",
          "@id": "schema:PaymentStatusType",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "A predefined value for a product characteristic, e.g. the power cord plug type \"US\" or the garment sizes \"S\", \"M\", \"L\", and \"XL\".",
          "name": "QualitativeValue",
          "@id": "schema:QualitativeValue",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:QualitativeValue",  "description": "A value indicating a special usage of a car, e.g. commercial rental, driving school, or as a taxi.",
              "name": "CarUsageType",
              "@id": "schema:CarUsageType",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:QualitativeValue",  "description": "A value indicating which roadwheels will receive torque.",
              "name": "DriveWheelConfigurationValue",
              "@id": "schema:DriveWheelConfigurationValue",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:QualitativeValue",  "description": "A value indicating a steering position.",
              "name": "SteeringPositionValue",
              "@id": "schema:SteeringPositionValue",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "Enumerated status values for Reservation.",
          "name": "ReservationStatusType",
          "@id": "schema:ReservationStatusType",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "RsvpResponseType is an enumeration type whose instances represent responding to an RSVP request.",
          "name": "RsvpResponseType",
          "@id": "schema:RsvpResponseType",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "Any branch of a field in which people typically develop specific expertise, usually after significant study, time, and effort.",
          "name": "Specialty",
          "@id": "schema:Specialty",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Enumeration",  "description": "A range of of services that will be provided to a customer free of charge in case of a defect or malfunction of a product...",
          "name": "WarrantyScope",
          "@id": "schema:WarrantyScope",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "An airline flight.",
      "name": "Flight",
      "@id": "schema:Flight",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "Server that provides game interaction in a multiplayer game.",
      "name": "GameServer",
      "@id": "schema:GameServer",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "A statement of the money due for goods or services; a bill.",
      "name": "Invoice",
      "@id": "schema:Invoice",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "A list of items of any sort&#x2014;for example, Top 10 Movies About Weathermen, or Top 100 Party Songs...",
      "name": "ItemList",
      "@id": "schema:ItemList",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ItemList",  "description": "A BreadcrumbList is an ItemList consisting of a chain of linked Web pages, typically described using at least their URL and their name, and typically ending with the current page...",
          "name": "BreadcrumbList",
          "@id": "schema:BreadcrumbList",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ItemList",  "description": "An OfferCatalog is an ItemList that contains related Offers and/or further OfferCatalogs that are offeredBy the same provider.",
          "name": "OfferCatalog",
          "@id": "schema:OfferCatalog",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "A listing that describes a job opening in a certain organization.",
      "name": "JobPosting",
      "@id": "schema:JobPosting",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "Natural languages such as Spanish, Tamil, Hindi, English, etc...",
      "name": "Language",
      "@id": "schema:Language",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "An list item, e.g. a step in a checklist or how-to description.",
      "name": "ListItem",
      "@id": "schema:ListItem",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "An offer to transfer some rights to an item or to provide a service&#x2014;for example, an offer to sell tickets to an event, to rent the DVD of a movie, to stream a TV show over the internet, to repair a motorcycle, or to loan a book...",
      "name": "Offer",
      "@id": "schema:Offer",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Offer",  "description": "When a single product is associated with multiple offers (for example, the same pair of shoes is offered by different merchants), then AggregateOffer can be used.",
          "name": "AggregateOffer",
          "@id": "schema:AggregateOffer",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "An order is a confirmation of a transaction (a receipt), which can contain multiple line items, each represented by an Offer that has been accepted by the customer.",
      "name": "Order",
      "@id": "schema:Order",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "An order item is a line of an order. It includes the quantity and shipping details of a bought offer.",
      "name": "OrderItem",
      "@id": "schema:OrderItem",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "The delivery of a parcel either via the postal service or a commercial service.",
      "name": "ParcelDelivery",
      "@id": "schema:ParcelDelivery",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "A permit issued by an organization, e.g. a parking pass.",
      "name": "Permit",
      "@id": "schema:Permit",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Permit",  "description": "A permit issued by a government agency.",
          "name": "GovernmentPermit",
          "@id": "schema:GovernmentPermit",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "Used to describe membership in a loyalty programs (e.g. \"StarAliance\"), traveler clubs (e...",
      "name": "ProgramMembership",
      "@id": "schema:ProgramMembership",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "A property, used to indicate attributes and relationships of some Thing; equivalent to rdf:Property.",
      "name": "Property",
      "@id": "schema:Property",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "A Property value specification.",
      "name": "PropertyValueSpecification",
      "@id": "schema:PropertyValueSpecification",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "Quantities such as distance, time, mass, weight, etc. Particular instances of say Mass are entities like '3 Kg' or '4 milligrams'.",
      "name": "Quantity",
      "@id": "schema:Quantity",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Quantity",  "description": "Properties that take Distances as values are of the form '&lt;Number&gt; &lt;Length unit of measure&gt;'...",
          "name": "Distance",
          "@id": "schema:Distance",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Quantity",  "description": "Quantity: Duration (use  ISO 8601 duration format).",
          "name": "Duration",
          "@id": "schema:Duration",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Quantity",  "description": "Properties that take Energy as values are of the form '&lt;Number&gt; &lt;Energy unit of measure&gt;'.",
          "name": "Energy",
          "@id": "schema:Energy",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Quantity",  "description": "Properties that take Mass as values are of the form '&lt;Number&gt; &lt;Mass unit of measure&gt;'...",
          "name": "Mass",
          "@id": "schema:Mass",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "A rating is an evaluation on a numeric scale, such as 1 to 5 stars.",
      "name": "Rating",
      "@id": "schema:Rating",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Rating",  "description": "The average rating based on multiple ratings or reviews.",
          "name": "AggregateRating",
          "@id": "schema:AggregateRating",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "Describes a reservation for travel, dining or an event. Some reservations require tickets.",
      "name": "Reservation",
      "@id": "schema:Reservation",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Reservation",  "description": "A reservation for bus travel.",
          "name": "BusReservation",
          "@id": "schema:BusReservation",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Reservation",  "description": "A reservation for an event like a concert, sporting event, or lecture.",
          "name": "EventReservation",
          "@id": "schema:EventReservation",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Reservation",  "description": "A reservation for air travel.",
          "name": "FlightReservation",
          "@id": "schema:FlightReservation",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Reservation",  "description": "A reservation to dine at a food-related business.",
          "name": "FoodEstablishmentReservation",
          "@id": "schema:FoodEstablishmentReservation",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Reservation",  "description": "A reservation for lodging at a hotel, motel, inn, etc.",
          "name": "LodgingReservation",
          "@id": "schema:LodgingReservation",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Reservation",  "description": "A reservation for a rental car.",
          "name": "RentalCarReservation",
          "@id": "schema:RentalCarReservation",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Reservation",  "description": "A group of multiple reservations with common values for all sub-reservations.",
          "name": "ReservationPackage",
          "@id": "schema:ReservationPackage",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Reservation",  "description": "A reservation for a taxi.",
          "name": "TaxiReservation",
          "@id": "schema:TaxiReservation",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Reservation",  "description": "A reservation for train travel.",
          "name": "TrainReservation",
          "@id": "schema:TrainReservation",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "Represents additional information about a relationship or property...",
      "name": "Role",
      "@id": "schema:Role",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Role",  "description": "A subclass of Role used to describe roles within organizations.",
          "name": "OrganizationRole",
          "@id": "schema:OrganizationRole",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:OrganizationRole",  "description": "A subclass of OrganizationRole used to describe employee relationships.",
              "name": "EmployeeRole",
              "@id": "schema:EmployeeRole",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Role",  "description": "A PerformanceRole is a Role that some entity places with regard to a theatrical performance, e...",
          "name": "PerformanceRole",
          "@id": "schema:PerformanceRole",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "Used to describe a seat, such as a reserved seat in an event reservation.",
      "name": "Seat",
      "@id": "schema:Seat",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "A service provided by an organization, e.g. delivery service, print services, etc.",
      "name": "Service",
      "@id": "schema:Service",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Service",  "description": "A delivery service through which content is provided via broadcast over the air or online.",
          "name": "BroadcastService",
          "@id": "schema:BroadcastService",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Service",  "description": "A service which provides access to media programming like TV or radio...",
          "name": "CableOrSatelliteService",
          "@id": "schema:CableOrSatelliteService",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Service",  "description": "A service provided by a government organization, e.g. food stamps, veterans benefits, etc.",
          "name": "GovernmentService",
          "@id": "schema:GovernmentService",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Service",  "description": "A taxi.",
          "name": "Taxi",
          "@id": "schema:Taxi",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Service",  "description": "A service for a vehicle for hire with a driver for local travel...",
          "name": "TaxiService",
          "@id": "schema:TaxiService",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "A means for accessing a service, e.g. a government office location, web site, or phone number.",
      "name": "ServiceChannel",
      "@id": "schema:ServiceChannel",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "Structured values are used when the value of a property has a more complex structure than simply being a textual value or a reference to another thing.",
      "name": "StructuredValue",
      "@id": "schema:StructuredValue",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:StructuredValue",  "description": "A contact point&#x2014;for example, a Customer Complaints department.",
          "name": "ContactPoint",
          "@id": "schema:ContactPoint",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:ContactPoint",  "description": "The mailing address.",
              "name": "PostalAddress",
              "@id": "schema:PostalAddress",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:StructuredValue",  "description": "A DatedMoneySpecification represents monetary values with optional start and end dates...",
          "name": "DatedMoneySpecification",
          "@id": "schema:DatedMoneySpecification",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:StructuredValue",  "description": "Information about the engine of the vehicle. A vehicle can have multiple engines represented by multiple engine specification entities.",
          "name": "EngineSpecification",
          "@id": "schema:EngineSpecification",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:StructuredValue",  "description": "The geographic coordinates of a place or event.",
          "name": "GeoCoordinates",
          "@id": "schema:GeoCoordinates",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:StructuredValue",  "description": "The geographic shape of a place. A GeoShape can be described using several properties whose values are based on latitude/longitude pairs...",
          "name": "GeoShape",
          "@id": "schema:GeoShape",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:GeoShape",  "description": "A GeoCircle is a GeoShape representing a circular geographic area...",
              "name": "GeoCircle",
              "@id": "schema:GeoCircle",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:StructuredValue",  "description": "A summary of how users have interacted with this CreativeWork...",
          "name": "InteractionCounter",
          "@id": "schema:InteractionCounter",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:StructuredValue",  "description": "Nutritional information about the recipe.",
          "name": "NutritionInformation",
          "@id": "schema:NutritionInformation",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:StructuredValue",  "description": "A structured value providing information about the opening hours of a place or a certain service inside a place.",
          "name": "OpeningHoursSpecification",
          "@id": "schema:OpeningHoursSpecification",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:StructuredValue",  "description": "A structured value providing information about when a certain organization or person owned a certain product.",
          "name": "OwnershipInfo",
          "@id": "schema:OwnershipInfo",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:StructuredValue",  "description": "A structured value representing a monetary amount. Typically, only the subclasses of this type are used for markup.",
          "name": "PriceSpecification",
          "@id": "schema:PriceSpecification",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PriceSpecification",  "description": "The price for the delivery of an offer using a particular delivery method.",
              "name": "DeliveryChargeSpecification",
              "@id": "schema:DeliveryChargeSpecification",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PriceSpecification",  "description": "The costs of settling the payment using a particular payment method.",
              "name": "PaymentChargeSpecification",
              "@id": "schema:PaymentChargeSpecification",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PriceSpecification",  "description": "The price asked for a given offer by the respective organization or person.",
              "name": "UnitPriceSpecification",
              "@id": "schema:UnitPriceSpecification",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:StructuredValue",  "description": "A property-value pair, e.g. representing a feature of a product or place...",
          "name": "PropertyValue",
          "@id": "schema:PropertyValue",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:StructuredValue",  "description": "A point value or interval for product characteristics and other purposes.",
          "name": "QuantitativeValue",
          "@id": "schema:QuantitativeValue",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:StructuredValue",  "description": "A structured value indicating the quantity, unit of measurement, and business function of goods included in a bundle offer.",
          "name": "TypeAndQuantityNode",
          "@id": "schema:TypeAndQuantityNode",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:StructuredValue",  "description": "A structured value representing the duration and scope of services that will be provided to a customer free of charge in case of a defect or malfunction of a product.",
          "name": "WarrantyPromise",
          "@id": "schema:WarrantyPromise",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "Used to describe a ticket to an event, a flight, a bus ride, etc.",
      "name": "Ticket",
      "@id": "schema:Ticket",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Intangible",  "description": "A trip on a commercial train line.",
      "name": "TrainTrip",
      "@id": "schema:TrainTrip",
      "layer": "core"

      }

    ]

  },


  {

  "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Thing",  "description": "The most generic type of entity related to health and the practice of medicine.",
  "name": "MedicalEntity",
  "@id": "schema:MedicalEntity",
  "layer": "core",
  "children":
    [

      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEntity",  "description": "Any part of the human body, typically a component of an anatomical system...",
      "name": "AnatomicalStructure",
      "@id": "schema:AnatomicalStructure",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AnatomicalStructure",  "description": "Rigid connective tissue that comprises up the skeletal structure of the human body.",
          "name": "Bone",
          "@id": "schema:Bone",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AnatomicalStructure",  "description": "Any anatomical structure which pertains to the soft nervous tissue functioning as the coordinating center of sensation and intellectual and nervous activity.",
          "name": "BrainStructure",
          "@id": "schema:BrainStructure",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AnatomicalStructure",  "description": "The anatomical location at which two or more bones make contact.",
          "name": "Joint",
          "@id": "schema:Joint",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AnatomicalStructure",  "description": "A short band of tough, flexible, fibrous connective tissue that functions to connect multiple bones, cartilages, and structurally support joints.",
          "name": "Ligament",
          "@id": "schema:Ligament",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AnatomicalStructure",  "description": "A muscle is an anatomical structure consisting of a contractile form of tissue that animals use to effect movement.",
          "name": "Muscle",
          "@id": "schema:Muscle",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AnatomicalStructure",  "description": "A common pathway for the electrochemical nerve impulses that are transmitted along each of the axons.",
          "name": "Nerve",
          "@id": "schema:Nerve",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AnatomicalStructure",  "description": "A component of the human body circulatory system comprised of an intricate network of hollow tubes that transport blood throughout the entire body.",
          "name": "Vessel",
          "@id": "schema:Vessel",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Vessel",  "description": "A type of blood vessel that specifically carries blood away from the heart.",
              "name": "Artery",
              "@id": "schema:Artery",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Vessel",  "description": "A type of blood vessel that specifically carries lymph fluid unidirectionally toward the heart.",
              "name": "LymphaticVessel",
              "@id": "schema:LymphaticVessel",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Vessel",  "description": "A type of blood vessel that specifically carries blood to the heart.",
              "name": "Vein",
              "@id": "schema:Vein",
              "layer": "core"

              }

            ]

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEntity",  "description": "An anatomical system is a group of anatomical structures that work together to perform a certain task...",
      "name": "AnatomicalSystem",
      "@id": "schema:AnatomicalSystem",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEntity",  "description": "The causative agent(s) that are responsible for the pathophysiologic process that eventually results in a medical condition, symptom or sign...",
      "name": "MedicalCause",
      "@id": "schema:MedicalCause",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEntity",  "description": "Any condition of the human body that affects the normal functioning of a person, whether physically or mentally...",
      "name": "MedicalCondition",
      "@id": "schema:MedicalCondition",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalCondition",  "description": "An infectious disease is a clinically evident human disease resulting from the presence of pathogenic microbial agents, like pathogenic viruses, pathogenic bacteria, fungi, protozoa, multicellular parasites, and prions...",
          "name": "InfectiousDisease",
          "@id": "schema:InfectiousDisease",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEntity",  "description": "A condition or factor that serves as a reason to withhold a certain medical therapy...",
      "name": "MedicalContraindication",
      "@id": "schema:MedicalContraindication",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEntity",  "description": "Any object used in a medical capacity, such as to diagnose or treat a patient.",
      "name": "MedicalDevice",
      "@id": "schema:MedicalDevice",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEntity",  "description": "Any recommendation made by a standard society (e.g. ACC/AHA) or consensus statement that denotes how to diagnose and treat a particular condition...",
      "name": "MedicalGuideline",
      "@id": "schema:MedicalGuideline",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalGuideline",  "description": "A guideline contraindication that designates a process as harmful and where quality of the data supporting the contraindication is sound.",
          "name": "MedicalGuidelineContraindication",
          "@id": "schema:MedicalGuidelineContraindication",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalGuideline",  "description": "A guideline recommendation that is regarded as efficacious and where quality of the data supporting the recommendation is sound.",
          "name": "MedicalGuidelineRecommendation",
          "@id": "schema:MedicalGuidelineRecommendation",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEntity",  "description": "A condition or factor that indicates use of a medical therapy, including signs, symptoms, risk factors, anatomical states, etc.",
      "name": "MedicalIndication",
      "@id": "schema:MedicalIndication",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalIndication",  "description": "An indication for a medical therapy that has been formally specified or approved by a regulatory body that regulates use of the therapy; for example, the US FDA approves indications for most drugs in the US.",
          "name": "ApprovedIndication",
          "@id": "schema:ApprovedIndication",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalIndication",  "description": "An indication for preventing an underlying condition, symptom, etc.",
          "name": "PreventionIndication",
          "@id": "schema:PreventionIndication",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalIndication",  "description": "An indication for treating an underlying condition, symptom, etc.",
          "name": "TreatmentIndication",
          "@id": "schema:TreatmentIndication",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEntity",  "description": "A utility class that serves as the umbrella for a number of 'intangible' things in the medical space.",
      "name": "MedicalIntangible",
      "@id": "schema:MedicalIntangible",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalIntangible",  "description": "An alternative, closely-related condition typically considered later in the differential diagnosis process along with the signs that are used to distinguish it.",
          "name": "DDxElement",
          "@id": "schema:DDxElement",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalIntangible",  "description": "A specific dosing schedule for a drug or supplement.",
          "name": "DoseSchedule",
          "@id": "schema:DoseSchedule",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:DoseSchedule",  "description": "The maximum dosing schedule considered safe for a drug or supplement as recommended by an authority or by the drug/supplement's manufacturer...",
              "name": "MaximumDoseSchedule",
              "@id": "schema:MaximumDoseSchedule",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:DoseSchedule",  "description": "A recommended dosing schedule for a drug or supplement as prescribed or recommended by an authority or by the drug/supplement's manufacturer...",
              "name": "RecommendedDoseSchedule",
              "@id": "schema:RecommendedDoseSchedule",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:DoseSchedule",  "description": "A patient-reported or observed dosing schedule for a drug or supplement.",
              "name": "ReportedDoseSchedule",
              "@id": "schema:ReportedDoseSchedule",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalIntangible",  "description": "The cost per unit of a medical drug. Note that this type is not meant to represent the price in an offer of a drug for sale; see the Offer type for that...",
          "name": "DrugCost",
          "@id": "schema:DrugCost",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalIntangible",  "description": "The legal availability status of a medical drug.",
          "name": "DrugLegalStatus",
          "@id": "schema:DrugLegalStatus",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalIntangible",  "description": "A specific strength in which a medical drug is available in a specific country.",
          "name": "DrugStrength",
          "@id": "schema:DrugStrength",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalIntangible",  "description": "A code for a medical entity.",
          "name": "MedicalCode",
          "@id": "schema:MedicalCode",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalIntangible",  "description": "A stage of a medical condition, such as 'Stage IIIa'.",
          "name": "MedicalConditionStage",
          "@id": "schema:MedicalConditionStage",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEntity",  "description": "A process of care used in either a diagnostic, therapeutic, or palliative capacity that relies on invasive (surgical), non-invasive, or percutaneous techniques.",
      "name": "MedicalProcedure",
      "@id": "schema:MedicalProcedure",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalProcedure",  "description": "A medical procedure intended primarily for diagnostic, as opposed to therapeutic, purposes.",
          "name": "DiagnosticProcedure",
          "@id": "schema:DiagnosticProcedure",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalProcedure",  "description": "A medical procedure intended primarily for palliative purposes, aimed at relieving the symptoms of an underlying health condition.",
          "name": "PalliativeProcedure",
          "@id": "schema:PalliativeProcedure",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalProcedure",  "description": "A medical procedure intended primarily for therapeutic purposes, aimed at improving a health condition.",
          "name": "TherapeuticProcedure",
          "@id": "schema:TherapeuticProcedure",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEntity",  "description": "Any rule set or interactive tool for estimating the risk of developing a complication or condition.",
      "name": "MedicalRiskEstimator",
      "@id": "schema:MedicalRiskEstimator",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalRiskEstimator",  "description": "A complex mathematical calculation requiring an online calculator, used to assess prognosis...",
          "name": "MedicalRiskCalculator",
          "@id": "schema:MedicalRiskCalculator",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalRiskEstimator",  "description": "A simple system that adds up the number of risk factors to yield a score that is associated with prognosis, e...",
          "name": "MedicalRiskScore",
          "@id": "schema:MedicalRiskScore",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEntity",  "description": "A risk factor is anything that increases a person's likelihood of developing or contracting a disease, medical condition, or complication.",
      "name": "MedicalRiskFactor",
      "@id": "schema:MedicalRiskFactor",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEntity",  "description": "Any indication of the existence of a medical condition or disease.",
      "name": "MedicalSignOrSymptom",
      "@id": "schema:MedicalSignOrSymptom",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalSignOrSymptom",  "description": "Any physical manifestation of a person's medical condition discoverable by objective diagnostic tests or physical examination.",
          "name": "MedicalSign",
          "@id": "schema:MedicalSign",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalSignOrSymptom",  "description": "Any indication of the existence of a medical condition or disease that is apparent to the patient.",
          "name": "MedicalSymptom",
          "@id": "schema:MedicalSymptom",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEntity",  "description": "A medical study is an umbrella type covering all kinds of research studies relating to human medicine or health, including observational studies and interventional trials and registries, randomized, controlled or not...",
      "name": "MedicalStudy",
      "@id": "schema:MedicalStudy",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalStudy",  "description": "An observational study is a type of medical study that attempts to infer the possible effect of a treatment through observation of a cohort of subjects over a period of time...",
          "name": "MedicalObservationalStudy",
          "@id": "schema:MedicalObservationalStudy",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalStudy",  "description": "A medical trial is a type of medical study that uses scientific process used to compare the safety and efficacy of medical therapies or medical procedures...",
          "name": "MedicalTrial",
          "@id": "schema:MedicalTrial",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEntity",  "description": "Any medical test, typically performed for diagnostic purposes.",
      "name": "MedicalTest",
      "@id": "schema:MedicalTest",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalTest",  "description": "A medical test performed on a sample of a patient's blood.",
          "name": "BloodTest",
          "@id": "schema:BloodTest",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalTest",  "description": "Any medical imaging modality typically used for diagnostic purposes.",
          "name": "ImagingTest",
          "@id": "schema:ImagingTest",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalTest",  "description": "Any collection of tests commonly ordered together.",
          "name": "MedicalTestPanel",
          "@id": "schema:MedicalTestPanel",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalTest",  "description": "A medical test performed by a laboratory that typically involves examination of a tissue sample by a pathologist.",
          "name": "PathologyTest",
          "@id": "schema:PathologyTest",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEntity",  "description": "Any medical intervention designed to prevent, treat, and cure human diseases and medical conditions, including both curative and palliative therapies...",
      "name": "MedicalTherapy",
      "@id": "schema:MedicalTherapy",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalTherapy",  "description": "A product taken by mouth that contains a dietary ingredient intended to supplement the diet...",
          "name": "DietarySupplement",
          "@id": "schema:DietarySupplement",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalTherapy",  "description": "A chemical or biologic substance, used as a medical therapy, that has a physiological effect on an organism.",
          "name": "Drug",
          "@id": "schema:Drug",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalTherapy",  "description": "A class of medical drugs, e.g., statins. Classes can represent general pharmacological class, common mechanisms of action, common physiological effects, etc.",
          "name": "DrugClass",
          "@id": "schema:DrugClass",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalTherapy",  "description": "A process of care involving exercise, changes to diet, fitness routines, and other lifestyle changes aimed at improving a health condition.",
          "name": "LifestyleModification",
          "@id": "schema:LifestyleModification",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LifestyleModification",  "description": "Any bodily activity that enhances or maintains physical fitness and overall health and wellness...",
              "name": "PhysicalActivity",
              "@id": "schema:PhysicalActivity",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalTherapy",  "description": "A process of progressive physical care and rehabilitation aimed at improving a health condition.",
          "name": "PhysicalTherapy",
          "@id": "schema:PhysicalTherapy",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalTherapy",  "description": "A process of care relying upon counseling, dialogue, communication, verbalization aimed at improving a mental health condition.",
          "name": "PsychologicalTreatment",
          "@id": "schema:PsychologicalTreatment",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalTherapy",  "description": "A process of care using radiation aimed at improving a health condition.",
          "name": "RadiationTherapy",
          "@id": "schema:RadiationTherapy",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalEntity",  "description": "Anatomical features that can be observed by sight (without dissection), including the form and proportions of the human body as well as surface landmarks that correspond to deeper subcutaneous structures...",
      "name": "SuperficialAnatomy",
      "@id": "schema:SuperficialAnatomy",
      "layer": "core"

      }

    ]

  },


  {

  "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Thing",  "description": "An organization such as a school, NGO, corporation, club, etc.",
  "name": "Organization",
  "@id": "schema:Organization",
  "layer": "core",
  "children":
    [

      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Organization",  "description": "An organization that provides flights for passengers.",
      "name": "Airline",
      "@id": "schema:Airline",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Organization",  "description": "Organization: A business corporation.",
      "name": "Corporation",
      "@id": "schema:Corporation",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Organization",  "description": "An educational organization.",
      "name": "EducationalOrganization",
      "@id": "schema:EducationalOrganization",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:EducationalOrganization",  "description": "A college, university, or other third-level educational institution.",
          "name": "CollegeOrUniversity",
          "@id": "schema:CollegeOrUniversity",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:EducationalOrganization",  "description": "An elementary school.",
          "name": "ElementarySchool",
          "@id": "schema:ElementarySchool",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:EducationalOrganization",  "description": "A high school.",
          "name": "HighSchool",
          "@id": "schema:HighSchool",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:EducationalOrganization",  "description": "A middle school (typically for children aged around 11-14, although this varies somewhat).",
          "name": "MiddleSchool",
          "@id": "schema:MiddleSchool",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:EducationalOrganization",  "description": "A preschool.",
          "name": "Preschool",
          "@id": "schema:Preschool",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:EducationalOrganization",  "description": "A school.",
          "name": "School",
          "@id": "schema:School",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Organization",  "description": "A governmental organization or agency.",
      "name": "GovernmentOrganization",
      "@id": "schema:GovernmentOrganization",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Organization",  "description": "A particular physical business or branch of an organization. Examples of LocalBusiness include a restaurant, a particular branch of a restaurant chain, a branch of a bank, a medical practice, a club, a bowling alley, etc.",
      "name": "LocalBusiness",
      "@id": "schema:LocalBusiness",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "Animal shelter.",
          "name": "AnimalShelter",
          "@id": "schema:AnimalShelter",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "Car repair, sales, or parts.",
          "name": "AutomotiveBusiness",
          "@id": "schema:AutomotiveBusiness",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AutomotiveBusiness",  "description": "Auto body shop.",
              "name": "AutoBodyShop",
              "@id": "schema:AutoBodyShop",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AutomotiveBusiness",  "description": "An car dealership.",
              "name": "AutoDealer",
              "@id": "schema:AutoDealer",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AutomotiveBusiness",  "description": "An auto parts store.",
              "name": "AutoPartsStore",
              "@id": "schema:AutoPartsStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AutomotiveBusiness",  "description": "A car rental business.",
              "name": "AutoRental",
              "@id": "schema:AutoRental",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AutomotiveBusiness",  "description": "Car repair business.",
              "name": "AutoRepair",
              "@id": "schema:AutoRepair",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AutomotiveBusiness",  "description": "A car wash business.",
              "name": "AutoWash",
              "@id": "schema:AutoWash",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AutomotiveBusiness",  "description": "A gas station.",
              "name": "GasStation",
              "@id": "schema:GasStation",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AutomotiveBusiness",  "description": "A motorcycle dealer.",
              "name": "MotorcycleDealer",
              "@id": "schema:MotorcycleDealer",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AutomotiveBusiness",  "description": "A motorcycle repair shop.",
              "name": "MotorcycleRepair",
              "@id": "schema:MotorcycleRepair",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A Childcare center.",
          "name": "ChildCare",
          "@id": "schema:ChildCare",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A dry-cleaning business.",
          "name": "DryCleaningOrLaundry",
          "@id": "schema:DryCleaningOrLaundry",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "An emergency service, such as a fire station or ER.",
          "name": "EmergencyService",
          "@id": "schema:EmergencyService",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:EmergencyService",  "description": "A fire station. With firemen.",
              "name": "FireStation",
              "@id": "schema:FireStation",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:EmergencyService",  "description": "A hospital.",
              "name": "Hospital",
              "@id": "schema:Hospital",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:EmergencyService",  "description": "A police station.",
              "name": "PoliceStation",
              "@id": "schema:PoliceStation",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "An employment agency.",
          "name": "EmploymentAgency",
          "@id": "schema:EmploymentAgency",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A business providing entertainment.",
          "name": "EntertainmentBusiness",
          "@id": "schema:EntertainmentBusiness",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:EntertainmentBusiness",  "description": "An adult entertainment establishment.",
              "name": "AdultEntertainment",
              "@id": "schema:AdultEntertainment",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:EntertainmentBusiness",  "description": "An amusement park.",
              "name": "AmusementPark",
              "@id": "schema:AmusementPark",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:EntertainmentBusiness",  "description": "An art gallery.",
              "name": "ArtGallery",
              "@id": "schema:ArtGallery",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:EntertainmentBusiness",  "description": "A casino.",
              "name": "Casino",
              "@id": "schema:Casino",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:EntertainmentBusiness",  "description": "A comedy club.",
              "name": "ComedyClub",
              "@id": "schema:ComedyClub",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:EntertainmentBusiness",  "description": "A movie theater.",
              "name": "MovieTheater",
              "@id": "schema:MovieTheater",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:EntertainmentBusiness",  "description": "A nightclub or discotheque.",
              "name": "NightClub",
              "@id": "schema:NightClub",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "Financial services business.",
          "name": "FinancialService",
          "@id": "schema:FinancialService",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:FinancialService",  "description": "Accountancy business.\n        \n        As a LocalBusiness it can be\n        described as a provider of one or more\n        Service(s).",
              "name": "AccountingService",
              "@id": "schema:AccountingService",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:FinancialService",  "description": "ATM/cash machine.",
              "name": "AutomatedTeller",
              "@id": "schema:AutomatedTeller",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:FinancialService",  "description": "Bank or credit union.",
              "name": "BankOrCreditUnion",
              "@id": "schema:BankOrCreditUnion",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:FinancialService",  "description": "An Insurance agency.",
              "name": "InsuranceAgency",
              "@id": "schema:InsuranceAgency",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A food-related business.",
          "name": "FoodEstablishment",
          "@id": "schema:FoodEstablishment",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:FoodEstablishment",  "description": "A bakery.",
              "name": "Bakery",
              "@id": "schema:Bakery",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:FoodEstablishment",  "description": "A bar or pub.",
              "name": "BarOrPub",
              "@id": "schema:BarOrPub",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:FoodEstablishment",  "description": "Brewery.",
              "name": "Brewery",
              "@id": "schema:Brewery",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:FoodEstablishment",  "description": "A cafe or coffee shop.",
              "name": "CafeOrCoffeeShop",
              "@id": "schema:CafeOrCoffeeShop",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:FoodEstablishment",  "description": "A fast-food restaurant.",
              "name": "FastFoodRestaurant",
              "@id": "schema:FastFoodRestaurant",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:FoodEstablishment",  "description": "An ice cream shop.",
              "name": "IceCreamShop",
              "@id": "schema:IceCreamShop",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:FoodEstablishment",  "description": "A restaurant.",
              "name": "Restaurant",
              "@id": "schema:Restaurant",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:FoodEstablishment",  "description": "A winery.",
              "name": "Winery",
              "@id": "schema:Winery",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A government office&#x2014;for example, an IRS or DMV office.",
          "name": "GovernmentOffice",
          "@id": "schema:GovernmentOffice",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:GovernmentOffice",  "description": "A post office.",
              "name": "PostOffice",
              "@id": "schema:PostOffice",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "Health and beauty.",
          "name": "HealthAndBeautyBusiness",
          "@id": "schema:HealthAndBeautyBusiness",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:HealthAndBeautyBusiness",  "description": "Beauty salon.",
              "name": "BeautySalon",
              "@id": "schema:BeautySalon",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:HealthAndBeautyBusiness",  "description": "A day spa.",
              "name": "DaySpa",
              "@id": "schema:DaySpa",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:HealthAndBeautyBusiness",  "description": "A hair salon.",
              "name": "HairSalon",
              "@id": "schema:HairSalon",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:HealthAndBeautyBusiness",  "description": "A health club.",
              "name": "HealthClub",
              "@id": "schema:HealthClub",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:HealthAndBeautyBusiness",  "description": "A nail salon.",
              "name": "NailSalon",
              "@id": "schema:NailSalon",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:HealthAndBeautyBusiness",  "description": "A tattoo parlor.",
              "name": "TattooParlor",
              "@id": "schema:TattooParlor",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A construction business.\n        \n        A HomeAndConstructionBusiness is a LocalBusiness that provides services around homes and buildings...",
          "name": "HomeAndConstructionBusiness",
          "@id": "schema:HomeAndConstructionBusiness",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:HomeAndConstructionBusiness",  "description": "An electrician.",
              "name": "Electrician",
              "@id": "schema:Electrician",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:HomeAndConstructionBusiness",  "description": "A general contractor.",
              "name": "GeneralContractor",
              "@id": "schema:GeneralContractor",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:HomeAndConstructionBusiness",  "description": "A business that provide Heating, Ventilation and Air Conditioning services.",
              "name": "HVACBusiness",
              "@id": "schema:HVACBusiness",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:HomeAndConstructionBusiness",  "description": "A house painting service.",
              "name": "HousePainter",
              "@id": "schema:HousePainter",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:HomeAndConstructionBusiness",  "description": "A locksmith.",
              "name": "Locksmith",
              "@id": "schema:Locksmith",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:HomeAndConstructionBusiness",  "description": "A moving company.",
              "name": "MovingCompany",
              "@id": "schema:MovingCompany",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:HomeAndConstructionBusiness",  "description": "A plumbing service.",
              "name": "Plumber",
              "@id": "schema:Plumber",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:HomeAndConstructionBusiness",  "description": "A roofing contractor.",
              "name": "RoofingContractor",
              "@id": "schema:RoofingContractor",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "An internet cafe.",
          "name": "InternetCafe",
          "@id": "schema:InternetCafe",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A LegalService is a business that provides legally-oriented services, advice and representation, e...",
          "name": "LegalService",
          "@id": "schema:LegalService",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LegalService",  "description": "Professional service: Attorney. \n        This type is deprecated - LegalService is more inclusive and less ambiguous.",
              "name": "Attorney",
              "@id": "schema:Attorney",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LegalService",  "description": "A notary.",
              "name": "Notary",
              "@id": "schema:Notary",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A library.",
          "name": "Library",
          "@id": "schema:Library",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A lodging business, such as a motel, hotel, or inn.",
          "name": "LodgingBusiness",
          "@id": "schema:LodgingBusiness",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LodgingBusiness",  "description": "Bed and breakfast.",
              "name": "BedAndBreakfast",
              "@id": "schema:BedAndBreakfast",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LodgingBusiness",  "description": "A hostel - cheap accommodation, often in shared dormitories.",
              "name": "Hostel",
              "@id": "schema:Hostel",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LodgingBusiness",  "description": "A hotel.",
              "name": "Hotel",
              "@id": "schema:Hotel",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LodgingBusiness",  "description": "A motel.",
              "name": "Motel",
              "@id": "schema:Motel",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A medical organization, such as a doctor's office or clinic.",
          "name": "MedicalOrganization",
          "@id": "schema:MedicalOrganization",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalOrganization",  "description": "A dentist.",
              "name": "Dentist",
              "@id": "schema:Dentist",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalOrganization",  "description": "A medical laboratory that offers on-site or off-site diagnostic services.",
              "name": "DiagnosticLab",
              "@id": "schema:DiagnosticLab",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalOrganization",  "description": "A medical clinic.",
              "name": "MedicalClinic",
              "@id": "schema:MedicalClinic",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalOrganization",  "description": "A store that sells reading glasses and similar devices for improving vision.",
              "name": "Optician",
              "@id": "schema:Optician",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalOrganization",  "description": "A pharmacy or drugstore.",
              "name": "Pharmacy",
              "@id": "schema:Pharmacy",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalOrganization",  "description": "A doctor's office.",
              "name": "Physician",
              "@id": "schema:Physician",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:MedicalOrganization",  "description": "A vet's office.",
              "name": "VeterinaryCare",
              "@id": "schema:VeterinaryCare",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "Original definition: \"provider of professional services.\"\n        \n        The general ProfessionalService type\n        for local businesses was deprecated due to confusion with Service...",
          "name": "ProfessionalService",
          "@id": "schema:ProfessionalService",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A radio station.",
          "name": "RadioStation",
          "@id": "schema:RadioStation",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A real-estate agent.",
          "name": "RealEstateAgent",
          "@id": "schema:RealEstateAgent",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A recycling center.",
          "name": "RecyclingCenter",
          "@id": "schema:RecyclingCenter",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A self-storage facility.",
          "name": "SelfStorage",
          "@id": "schema:SelfStorage",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A shopping center or mall.",
          "name": "ShoppingCenter",
          "@id": "schema:ShoppingCenter",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A sports location, such as a playing field.",
          "name": "SportsActivityLocation",
          "@id": "schema:SportsActivityLocation",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:SportsActivityLocation",  "description": "A bowling alley.",
              "name": "BowlingAlley",
              "@id": "schema:BowlingAlley",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:SportsActivityLocation",  "description": "A gym.",
              "name": "ExerciseGym",
              "@id": "schema:ExerciseGym",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:SportsActivityLocation",  "description": "A golf course.",
              "name": "GolfCourse",
              "@id": "schema:GolfCourse",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:SportsActivityLocation",  "description": "A public swimming pool.",
              "name": "PublicSwimmingPool",
              "@id": "schema:PublicSwimmingPool",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:SportsActivityLocation",  "description": "A ski resort.",
              "name": "SkiResort",
              "@id": "schema:SkiResort",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:SportsActivityLocation",  "description": "A sports club.",
              "name": "SportsClub",
              "@id": "schema:SportsClub",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:SportsActivityLocation",  "description": "A stadium.",
              "name": "StadiumOrArena",
              "@id": "schema:StadiumOrArena",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:SportsActivityLocation",  "description": "A tennis complex.",
              "name": "TennisComplex",
              "@id": "schema:TennisComplex",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A retail good store.",
          "name": "Store",
          "@id": "schema:Store",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A bike store.",
              "name": "BikeStore",
              "@id": "schema:BikeStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A bookstore.",
              "name": "BookStore",
              "@id": "schema:BookStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A clothing store.",
              "name": "ClothingStore",
              "@id": "schema:ClothingStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A computer store.",
              "name": "ComputerStore",
              "@id": "schema:ComputerStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A convenience store.",
              "name": "ConvenienceStore",
              "@id": "schema:ConvenienceStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A department store.",
              "name": "DepartmentStore",
              "@id": "schema:DepartmentStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "An electronics store.",
              "name": "ElectronicsStore",
              "@id": "schema:ElectronicsStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A florist.",
              "name": "Florist",
              "@id": "schema:Florist",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A furniture store.",
              "name": "FurnitureStore",
              "@id": "schema:FurnitureStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A garden store.",
              "name": "GardenStore",
              "@id": "schema:GardenStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A grocery store.",
              "name": "GroceryStore",
              "@id": "schema:GroceryStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A hardware store.",
              "name": "HardwareStore",
              "@id": "schema:HardwareStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A store that sells materials useful or necessary for various hobbies.",
              "name": "HobbyShop",
              "@id": "schema:HobbyShop",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A home goods store.",
              "name": "HomeGoodsStore",
              "@id": "schema:HomeGoodsStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A jewelry store.",
              "name": "JewelryStore",
              "@id": "schema:JewelryStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A shop that sells alcoholic drinks such as wine, beer, whisky and other spirits.",
              "name": "LiquorStore",
              "@id": "schema:LiquorStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A men's clothing store.",
              "name": "MensClothingStore",
              "@id": "schema:MensClothingStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A store that sells mobile phones and related accessories.",
              "name": "MobilePhoneStore",
              "@id": "schema:MobilePhoneStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A movie rental store.",
              "name": "MovieRentalStore",
              "@id": "schema:MovieRentalStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A music store.",
              "name": "MusicStore",
              "@id": "schema:MusicStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "An office equipment store.",
              "name": "OfficeEquipmentStore",
              "@id": "schema:OfficeEquipmentStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "An outlet store.",
              "name": "OutletStore",
              "@id": "schema:OutletStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A shop that will buy, or lend money against the security of, personal possessions.",
              "name": "PawnShop",
              "@id": "schema:PawnShop",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A pet store.",
              "name": "PetStore",
              "@id": "schema:PetStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A shoe store.",
              "name": "ShoeStore",
              "@id": "schema:ShoeStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A sporting goods store.",
              "name": "SportingGoodsStore",
              "@id": "schema:SportingGoodsStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A tire shop.",
              "name": "TireShop",
              "@id": "schema:TireShop",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A toy store.",
              "name": "ToyStore",
              "@id": "schema:ToyStore",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Store",  "description": "A wholesale store.",
              "name": "WholesaleStore",
              "@id": "schema:WholesaleStore",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A television station.",
          "name": "TelevisionStation",
          "@id": "schema:TelevisionStation",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A tourist information center.",
          "name": "TouristInformationCenter",
          "@id": "schema:TouristInformationCenter",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:LocalBusiness",  "description": "A travel agency.",
          "name": "TravelAgency",
          "@id": "schema:TravelAgency",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Organization",  "description": "Organization: Non-governmental Organization.",
      "name": "NGO",
      "@id": "schema:NGO",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Organization",  "description": "A performance group, such as a band, an orchestra, or a circus.",
      "name": "PerformingGroup",
      "@id": "schema:PerformingGroup",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PerformingGroup",  "description": "A dance group&#x2014;for example, the Alvin Ailey Dance Theater or Riverdance.",
          "name": "DanceGroup",
          "@id": "schema:DanceGroup",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PerformingGroup",  "description": "A musical group, such as a band, an orchestra, or a choir. Can also be a solo musician.",
          "name": "MusicGroup",
          "@id": "schema:MusicGroup",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PerformingGroup",  "description": "A theater group or company, for example, the Royal Shakespeare Company or Druid Theatre.",
          "name": "TheaterGroup",
          "@id": "schema:TheaterGroup",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Organization",  "description": "Represents the collection of all sports organizations, including sports teams, governing bodies, and sports associations.",
      "name": "SportsOrganization",
      "@id": "schema:SportsOrganization",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:SportsOrganization",  "description": "Organization: Sports team.",
          "name": "SportsTeam",
          "@id": "schema:SportsTeam",
          "layer": "core"

          }

        ]

      }

    ]

  },


  {

  "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Thing",  "description": "A person (alive, dead, undead, or fictional).",
  "name": "Person",
  "@id": "schema:Person",
  "layer": "core"

  },


  {

  "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Thing",  "description": "Entities that have a somewhat fixed, physical extension.",
  "name": "Place",
  "@id": "schema:Place",
  "layer": "core",
  "children":
    [

      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Place",  "description": "A geographical region, typically under the jurisdiction of a particular government.",
      "name": "AdministrativeArea",
      "@id": "schema:AdministrativeArea",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AdministrativeArea",  "description": "A city or town.",
          "name": "City",
          "@id": "schema:City",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AdministrativeArea",  "description": "A country.",
          "name": "Country",
          "@id": "schema:Country",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:AdministrativeArea",  "description": "A state or province of a country.",
          "name": "State",
          "@id": "schema:State",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Place",  "description": "A public structure, such as a town hall or concert hall.",
      "name": "CivicStructure",
      "@id": "schema:CivicStructure",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "An airport.",
          "name": "Airport",
          "@id": "schema:Airport",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "Aquarium.",
          "name": "Aquarium",
          "@id": "schema:Aquarium",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "Beach.",
          "name": "Beach",
          "@id": "schema:Beach",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "A bridge.",
          "name": "Bridge",
          "@id": "schema:Bridge",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "A bus station.",
          "name": "BusStation",
          "@id": "schema:BusStation",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "A bus stop.",
          "name": "BusStop",
          "@id": "schema:BusStop",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "A campground.",
          "name": "Campground",
          "@id": "schema:Campground",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "A graveyard.",
          "name": "Cemetery",
          "@id": "schema:Cemetery",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "A crematorium.",
          "name": "Crematorium",
          "@id": "schema:Crematorium",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "An event venue.",
          "name": "EventVenue",
          "@id": "schema:EventVenue",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "A government building.",
          "name": "GovernmentBuilding",
          "@id": "schema:GovernmentBuilding",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:GovernmentBuilding",  "description": "A city hall.",
              "name": "CityHall",
              "@id": "schema:CityHall",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:GovernmentBuilding",  "description": "A courthouse.",
              "name": "Courthouse",
              "@id": "schema:Courthouse",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:GovernmentBuilding",  "description": "A defence establishment, such as an army or navy base.",
              "name": "DefenceEstablishment",
              "@id": "schema:DefenceEstablishment",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:GovernmentBuilding",  "description": "An embassy.",
              "name": "Embassy",
              "@id": "schema:Embassy",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:GovernmentBuilding",  "description": "A legislative building&#x2014;for example, the state capitol.",
              "name": "LegislativeBuilding",
              "@id": "schema:LegislativeBuilding",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "A museum.",
          "name": "Museum",
          "@id": "schema:Museum",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "A music venue.",
          "name": "MusicVenue",
          "@id": "schema:MusicVenue",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "A park.",
          "name": "Park",
          "@id": "schema:Park",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "A parking lot or other parking facility.",
          "name": "ParkingFacility",
          "@id": "schema:ParkingFacility",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "A theater or other performing art center.",
          "name": "PerformingArtsTheater",
          "@id": "schema:PerformingArtsTheater",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "Place of worship, such as a church, synagogue, or mosque.",
          "name": "PlaceOfWorship",
          "@id": "schema:PlaceOfWorship",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PlaceOfWorship",  "description": "A Buddhist temple.",
              "name": "BuddhistTemple",
              "@id": "schema:BuddhistTemple",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PlaceOfWorship",  "description": "A Catholic church.",
              "name": "CatholicChurch",
              "@id": "schema:CatholicChurch",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PlaceOfWorship",  "description": "A church.",
              "name": "Church",
              "@id": "schema:Church",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PlaceOfWorship",  "description": "A Hindu temple.",
              "name": "HinduTemple",
              "@id": "schema:HinduTemple",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PlaceOfWorship",  "description": "A mosque.",
              "name": "Mosque",
              "@id": "schema:Mosque",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:PlaceOfWorship",  "description": "A synagogue.",
              "name": "Synagogue",
              "@id": "schema:Synagogue",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "A playground.",
          "name": "Playground",
          "@id": "schema:Playground",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "A place offering space for \"Recreational Vehicles\", Caravans, mobile homes and the like.",
          "name": "RVPark",
          "@id": "schema:RVPark",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "A subway station.",
          "name": "SubwayStation",
          "@id": "schema:SubwayStation",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "A taxi stand.",
          "name": "TaxiStand",
          "@id": "schema:TaxiStand",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "A train station.",
          "name": "TrainStation",
          "@id": "schema:TrainStation",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:CivicStructure",  "description": "A zoo.",
          "name": "Zoo",
          "@id": "schema:Zoo",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Place",  "description": "A landform or physical feature.  Landform elements include mountains, plains, lakes, rivers, seascape and oceanic waterbody interface features such as bays, peninsulas, seas and so forth, including sub-aqueous terrain features such as submersed mountain ranges, volcanoes, and the great ocean basins.",
      "name": "Landform",
      "@id": "schema:Landform",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Landform",  "description": "A body of water, such as a sea, ocean, or lake.",
          "name": "BodyOfWater",
          "@id": "schema:BodyOfWater",
          "layer": "core",
          "children":
            [

              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:BodyOfWater",  "description": "A canal, like the Panama Canal.",
              "name": "Canal",
              "@id": "schema:Canal",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:BodyOfWater",  "description": "A lake (for example, Lake Pontrachain).",
              "name": "LakeBodyOfWater",
              "@id": "schema:LakeBodyOfWater",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:BodyOfWater",  "description": "An ocean (for example, the Pacific).",
              "name": "OceanBodyOfWater",
              "@id": "schema:OceanBodyOfWater",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:BodyOfWater",  "description": "A pond.",
              "name": "Pond",
              "@id": "schema:Pond",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:BodyOfWater",  "description": "A reservoir of water, typically an artificially created lake, like the Lake Kariba reservoir.",
              "name": "Reservoir",
              "@id": "schema:Reservoir",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:BodyOfWater",  "description": "A river (for example, the broad majestic Shannon).",
              "name": "RiverBodyOfWater",
              "@id": "schema:RiverBodyOfWater",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:BodyOfWater",  "description": "A sea (for example, the Caspian sea).",
              "name": "SeaBodyOfWater",
              "@id": "schema:SeaBodyOfWater",
              "layer": "core"

              },


              {

              "@type": "rdfs:Class", "rdfs:subClassOf": "schema:BodyOfWater",  "description": "A waterfall, like Niagara.",
              "name": "Waterfall",
              "@id": "schema:Waterfall",
              "layer": "core"

              }

            ]

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Landform",  "description": "One of the continents (for example, Europe or Africa).",
          "name": "Continent",
          "@id": "schema:Continent",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Landform",  "description": "A mountain, like Mount Whitney or Mount Everest.",
          "name": "Mountain",
          "@id": "schema:Mountain",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Landform",  "description": "A volcano, like Fuji san.",
          "name": "Volcano",
          "@id": "schema:Volcano",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Place",  "description": "An historical landmark or building.",
      "name": "LandmarksOrHistoricalBuildings",
      "@id": "schema:LandmarksOrHistoricalBuildings",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Place",  "description": "The place where a person lives.",
      "name": "Residence",
      "@id": "schema:Residence",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Residence",  "description": "Residence type: Apartment complex.",
          "name": "ApartmentComplex",
          "@id": "schema:ApartmentComplex",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Residence",  "description": "Residence type: Gated community.",
          "name": "GatedResidenceCommunity",
          "@id": "schema:GatedResidenceCommunity",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Residence",  "description": "Residence type: Single-family home.",
          "name": "SingleFamilyResidence",
          "@id": "schema:SingleFamilyResidence",
          "layer": "core"

          }

        ]

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Place",  "description": "A tourist attraction.",
      "name": "TouristAttraction",
      "@id": "schema:TouristAttraction",
      "layer": "core"

      }

    ]

  },


  {

  "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Thing",  "description": "Any offered product or service. For example: a pair of shoes; a concert ticket; the rental of a car; a haircut; or an episode of a TV show streamed online.",
  "name": "Product",
  "@id": "schema:Product",
  "layer": "core",
  "children":
    [

      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Product",  "description": "A single, identifiable product instance (e.g. a laptop with a particular serial number).",
      "name": "IndividualProduct",
      "@id": "schema:IndividualProduct",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Product",  "description": "A datasheet or vendor specification of a product (in the sense of a prototypical description).",
      "name": "ProductModel",
      "@id": "schema:ProductModel",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Product",  "description": "A placeholder for multiple similar products of the same kind.",
      "name": "SomeProducts",
      "@id": "schema:SomeProducts",
      "layer": "core"

      },


      {

      "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Product",  "description": "A vehicle is a device that is designed or used to transport people or cargo over land, water, air, or through space.",
      "name": "Vehicle",
      "@id": "schema:Vehicle",
      "layer": "core",
      "children":
        [

          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Vehicle",  "description": "A bus (also omnibus or autobus) is a road vehicle designed to carry passengers...",
          "name": "BusOrCoach",
          "@id": "schema:BusOrCoach",
          "layer": "auto"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Vehicle",  "description": "A car is a wheeled, self-powered motor vehicle used for transportation.",
          "name": "Car",
          "@id": "schema:Car",
          "layer": "core"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Vehicle",  "description": "A motorcycle or motorbike is a single-track, two-wheeled motor vehicle.",
          "name": "Motorcycle",
          "@id": "schema:Motorcycle",
          "layer": "auto"

          },


          {

          "@type": "rdfs:Class", "rdfs:subClassOf": "schema:Vehicle",  "description": "A motorized bicycle is a bicycle with an attached motor used to power the vehicle, or to assist with pedaling.",
          "name": "MotorizedBicycle",
          "@id": "schema:MotorizedBicycle",
          "layer": "auto"

          }

        ]

      }

    ]

  }

];
const layers = ['core', 'auto', 'bib'];
const layer = layers.reduce((o,s,i) => {o[s] = i; return o}, {});
const descriptions = {"Thing":"The most generic type of item."};
function reduceSchema(children) {
  return children.map((item, i) => {
    if (!!item.description) {
      descriptions[item.name] = item.description;
    }
    /* if (!item.children && item.layer === layers[0]) {
      return item.name
    } */
    let a = [item.name, layer[item.layer]];
    if (!!item.children) {
      a.push(reduceSchema(item.children))
    }
    return a
  });
}

const schemaCompact = {
  "@context": {
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "schema": "http://schema.org/",
    "rdfs:subClassOf": { "@type": "@id" },
    name: "rdfs:label",
    description: "rdfs:comment",
    children: { "@reverse": "rdfs:subClassOf" }
  },
  "@id": "schema:Thing",
  "@type": "rdfs:Class",
  name: "Thing",
  description: "The most generic type of item.",
  layer: "core",
  children: reduceSchema(schemaChildren)
};

console.log(JSON.stringify(schemaCompact), JSON.stringify(descriptions));
