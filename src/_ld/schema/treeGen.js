const tree = {
   "@context": {
      "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
      "schema": "https://schema.org",
      "rdfs:subClassOf": {
         "@type": "@id"
      },
      "description": "rdfs:comment",
      "children": {
         "@reverse": "rdfs:subClassOf"
      }
   },
   "@type": "rdfs:Class",
   "@id": "schema:Thing",
   "name": "Thing",
   "description": "The most generic type of item.",
   "children": [
      {
         "@type": "rdfs:Class",
         "@id": "schema:Action",
         "name": "Action",
         "rdfs:subClassOf": "schema:Thing",
         "description": "An action performed by a direct agent and indirect participants upon a direct object. Optionally happens at a location with the help of an inanimate instrument. The execution of the action may produce a result. Specific action sub-type documentation specifies the exact expectation of each argument/role...",
         "children": [
            {
               "@type": "rdfs:Class",
               "@id": "schema:AchieveAction",
               "name": "AchieveAction",
               "rdfs:subClassOf": "schema:Action",
               "description": "The act of accomplishing something via previous efforts. It is an instantaneous action rather than an ongoing process.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:LoseAction",
                     "name": "LoseAction",
                     "rdfs:subClassOf": "schema:AchieveAction",
                     "description": "The act of being defeated in a competitive activity."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TieAction",
                     "name": "TieAction",
                     "rdfs:subClassOf": "schema:AchieveAction",
                     "description": "The act of reaching a draw in a competitive activity."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:WinAction",
                     "name": "WinAction",
                     "rdfs:subClassOf": "schema:AchieveAction",
                     "description": "The act of achieving victory in a competitive activity."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:AssessAction",
               "name": "AssessAction",
               "rdfs:subClassOf": "schema:Action",
               "description": "The act of forming one's opinion, reaction or sentiment.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ChooseAction",
                     "name": "ChooseAction",
                     "rdfs:subClassOf": "schema:AssessAction",
                     "description": "The act of expressing a preference from a set of options or a large or unbounded set of choices/options.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:VoteAction",
                           "name": "VoteAction",
                           "rdfs:subClassOf": "schema:ChooseAction",
                           "description": "The act of expressing a preference from a fixed/finite/structured set of choices/options."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:IgnoreAction",
                     "name": "IgnoreAction",
                     "rdfs:subClassOf": "schema:AssessAction",
                     "description": "The act of intentionally disregarding the object. An agent ignores an object."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ReactAction",
                     "name": "ReactAction",
                     "rdfs:subClassOf": "schema:AssessAction",
                     "description": "The act of responding instinctively and emotionally to an object, expressing a sentiment.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AgreeAction",
                           "name": "AgreeAction",
                           "rdfs:subClassOf": "schema:ReactAction",
                           "description": "The act of expressing a consistency of opinion with the object. An agent agrees to/about an object (a proposition, topic or theme) with participants."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:DisagreeAction",
                           "name": "DisagreeAction",
                           "rdfs:subClassOf": "schema:ReactAction",
                           "description": "The act of expressing a difference of opinion with the object. An agent disagrees to/about an object (a proposition, topic or theme) with participants."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:DislikeAction",
                           "name": "DislikeAction",
                           "rdfs:subClassOf": "schema:ReactAction",
                           "description": "The act of expressing a negative sentiment about the object. An agent dislikes an object (a proposition, topic or theme) with participants."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:EndorseAction",
                           "name": "EndorseAction",
                           "rdfs:subClassOf": "schema:ReactAction",
                           "description": "An agent approves/certifies/likes/supports/sanction an object."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:LikeAction",
                           "name": "LikeAction",
                           "rdfs:subClassOf": "schema:ReactAction",
                           "description": "The act of expressing a positive sentiment about the object. An agent likes an object (a proposition, topic or theme) with participants."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:WantAction",
                           "name": "WantAction",
                           "rdfs:subClassOf": "schema:ReactAction",
                           "description": "The act of expressing a desire about the object. An agent wants an object."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ReviewAction",
                     "name": "ReviewAction",
                     "rdfs:subClassOf": "schema:AssessAction",
                     "description": "The act of producing a balanced opinion about the object for an audience. An agent reviews an object with participants resulting in a review."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ConsumeAction",
               "name": "ConsumeAction",
               "rdfs:subClassOf": "schema:Action",
               "description": "The act of ingesting information/resources/food.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DrinkAction",
                     "name": "DrinkAction",
                     "rdfs:subClassOf": "schema:ConsumeAction",
                     "description": "The act of swallowing liquids."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:EatAction",
                     "name": "EatAction",
                     "rdfs:subClassOf": "schema:ConsumeAction",
                     "description": "The act of swallowing solid objects."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:InstallAction",
                     "name": "InstallAction",
                     "rdfs:subClassOf": "schema:ConsumeAction",
                     "description": "The act of installing an application."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ListenAction",
                     "name": "ListenAction",
                     "rdfs:subClassOf": "schema:ConsumeAction",
                     "description": "The act of consuming audio content."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ReadAction",
                     "name": "ReadAction",
                     "rdfs:subClassOf": "schema:ConsumeAction",
                     "description": "The act of consuming written content."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:UseAction",
                     "name": "UseAction",
                     "rdfs:subClassOf": "schema:ConsumeAction",
                     "description": "The act of applying an object to its intended purpose.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:WearAction",
                           "name": "WearAction",
                           "rdfs:subClassOf": "schema:UseAction",
                           "description": "The act of dressing oneself in clothing."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ViewAction",
                     "name": "ViewAction",
                     "rdfs:subClassOf": "schema:ConsumeAction",
                     "description": "The act of consuming static visual content."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:WatchAction",
                     "name": "WatchAction",
                     "rdfs:subClassOf": "schema:ConsumeAction",
                     "description": "The act of consuming dynamic/moving visual content."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ControlAction",
               "name": "ControlAction",
               "rdfs:subClassOf": "schema:Action",
               "description": "An agent controls a device or application.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ActivateAction",
                     "name": "ActivateAction",
                     "rdfs:subClassOf": "schema:ControlAction",
                     "description": "The act of starting or activating a device or application (e.g. starting a timer or turning on a flashlight)."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DeactivateAction",
                     "name": "DeactivateAction",
                     "rdfs:subClassOf": "schema:ControlAction",
                     "description": "The act of stopping or deactivating a device or application (e.g. stopping a timer or turning off a flashlight)."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ResumeAction",
                     "name": "ResumeAction",
                     "rdfs:subClassOf": "schema:ControlAction",
                     "description": "The act of resuming a device or application which was formerly paused (e.g. resume music playback or resume a timer)."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:SuspendAction",
                     "name": "SuspendAction",
                     "rdfs:subClassOf": "schema:ControlAction",
                     "description": "The act of momentarily pausing a device or application (e.g. pause music playback or pause a timer)."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:CreateAction",
               "name": "CreateAction",
               "rdfs:subClassOf": "schema:Action",
               "description": "The act of deliberately creating/producing/generating/building a result out of the agent.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:CookAction",
                     "name": "CookAction",
                     "rdfs:subClassOf": "schema:CreateAction",
                     "description": "The act of producing/preparing food."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DrawAction",
                     "name": "DrawAction",
                     "rdfs:subClassOf": "schema:CreateAction",
                     "description": "The act of producing a visual/graphical representation of an object, typically with a pen/pencil and paper as instruments."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:FilmAction",
                     "name": "FilmAction",
                     "rdfs:subClassOf": "schema:CreateAction",
                     "description": "The act of capturing sound and moving images on film, video, or digitally."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PaintAction",
                     "name": "PaintAction",
                     "rdfs:subClassOf": "schema:CreateAction",
                     "description": "The act of producing a painting, typically with paint and canvas as instruments."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PhotographAction",
                     "name": "PhotographAction",
                     "rdfs:subClassOf": "schema:CreateAction",
                     "description": "The act of capturing still images of objects using a camera."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:WriteAction",
                     "name": "WriteAction",
                     "rdfs:subClassOf": "schema:CreateAction",
                     "description": "The act of authoring written creative content."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:FindAction",
               "name": "FindAction",
               "rdfs:subClassOf": "schema:Action",
               "description": "The act of finding an object.\n\nRelated actions:\n\n\nSearchAction: FindAction is generally lead by a SearchAction, but not necessarily.\n",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:CheckAction",
                     "name": "CheckAction",
                     "rdfs:subClassOf": "schema:FindAction",
                     "description": "An agent inspects, determines, investigates, inquires, or examines an object's accuracy, quality, condition, or state."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DiscoverAction",
                     "name": "DiscoverAction",
                     "rdfs:subClassOf": "schema:FindAction",
                     "description": "The act of discovering/finding an object."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TrackAction",
                     "name": "TrackAction",
                     "rdfs:subClassOf": "schema:FindAction",
                     "description": "An agent tracks an object for updates.\n\nRelated actions:\n\n\nFollowAction: Unlike FollowAction, TrackAction refers to the interest on the location of innanimates objects.\nSubscribeAction: Unlike SubscribeAction, TrackAction refers to  the interest on the location of innanimate objects."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:InteractAction",
               "name": "InteractAction",
               "rdfs:subClassOf": "schema:Action",
               "description": "The act of interacting with another person or organization.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BefriendAction",
                     "name": "BefriendAction",
                     "rdfs:subClassOf": "schema:InteractAction",
                     "description": "The act of forming a personal connection with someone (object) mutually/bidirectionally/symmetrically.\n\nRelated actions:\n\n\nFollowAction: Unlike FollowAction, BefriendAction implies that the connection is reciprocal.\n"
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:CommunicateAction",
                     "name": "CommunicateAction",
                     "rdfs:subClassOf": "schema:InteractAction",
                     "description": "The act of conveying information to another person via a communication medium (instrument) such as speech, email, or telephone conversation.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AskAction",
                           "name": "AskAction",
                           "rdfs:subClassOf": "schema:CommunicateAction",
                           "description": "The act of posing a question / favor to someone.\n\nRelated actions:\n\n\nReplyAction: Appears generally as a response to AskAction.\n"
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:CheckInAction",
                           "name": "CheckInAction",
                           "rdfs:subClassOf": "schema:CommunicateAction",
                           "description": "The act of an agent communicating (service provider, social media, etc) their arrival by registering/confirming for a previously reserved service (e.g. flight check in) or at a place (e.g. hotel), possibly resulting in a result (boarding pass, etc).\n\nRelated actions:\n\n\nCheckOutAction: The antonym of CheckInAction..."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:CheckOutAction",
                           "name": "CheckOutAction",
                           "rdfs:subClassOf": "schema:CommunicateAction",
                           "description": "The act of an agent communicating (service provider, social media, etc) their departure of a previously reserved service (e.g. flight check in) or place (e.g. hotel).\n\nRelated actions:\n\n\nCheckInAction: The antonym of CheckOutAction.\nDepartAction: Unlike DepartAction, CheckOutAction implies that the agent is informing/confirming the end of a previously reserved service..."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:CommentAction",
                           "name": "CommentAction",
                           "rdfs:subClassOf": "schema:CommunicateAction",
                           "description": "The act of generating a comment about a subject."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:InformAction",
                           "name": "InformAction",
                           "rdfs:subClassOf": "schema:CommunicateAction",
                           "description": "The act of notifying someone of information pertinent to them, with no expectation of a response.",
                           "children": [
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:ConfirmAction",
                                 "name": "ConfirmAction",
                                 "rdfs:subClassOf": "schema:InformAction",
                                 "description": "The act of notifying someone that a future event/action is going to happen as expected.\n\nRelated actions:\n\n\nCancelAction: The antonym of ConfirmAction.\n"
                              },
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:RsvpAction",
                                 "name": "RsvpAction",
                                 "rdfs:subClassOf": "schema:InformAction",
                                 "description": "The act of notifying an event organizer as to whether you expect to attend the event."
                              }
                           ]
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:InviteAction",
                           "name": "InviteAction",
                           "rdfs:subClassOf": "schema:CommunicateAction",
                           "description": "The act of asking someone to attend an event. Reciprocal of RsvpAction."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ReplyAction",
                           "name": "ReplyAction",
                           "rdfs:subClassOf": "schema:CommunicateAction",
                           "description": "The act of responding to a question/message asked/sent by the object. Related to AskAction\n\nRelated actions:\n\n\nAskAction: Appears generally as an origin of a ReplyAction.\n"
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ShareAction",
                           "name": "ShareAction",
                           "rdfs:subClassOf": "schema:CommunicateAction",
                           "description": "The act of distributing content to people for their amusement or edification."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:FollowAction",
                     "name": "FollowAction",
                     "rdfs:subClassOf": "schema:InteractAction",
                     "description": "The act of forming a personal connection with someone/something (object) unidirectionally/asymmetrically to get updates polled from.\n\nRelated actions:\n\n\nBefriendAction: Unlike BefriendAction, FollowAction implies that the connection is not necessarily reciprocal..."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:JoinAction",
                     "name": "JoinAction",
                     "rdfs:subClassOf": "schema:InteractAction",
                     "description": "An agent joins an event/group with participants/friends at a location.\n\nRelated actions:\n\n\nRegisterAction: Unlike RegisterAction, JoinAction refers to joining a group/team of people.\nSubscribeAction: Unlike SubscribeAction, JoinAction does not imply that you'll be receiving updates..."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:LeaveAction",
                     "name": "LeaveAction",
                     "rdfs:subClassOf": "schema:InteractAction",
                     "description": "An agent leaves an event / group with participants/friends at a location.\n\nRelated actions:\n\n\nJoinAction: The antonym of LeaveAction.\nUnRegisterAction: Unlike UnRegisterAction, LeaveAction implies leaving a group/team of people rather than a service."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MarryAction",
                     "name": "MarryAction",
                     "rdfs:subClassOf": "schema:InteractAction",
                     "description": "The act of marrying a person."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:RegisterAction",
                     "name": "RegisterAction",
                     "rdfs:subClassOf": "schema:InteractAction",
                     "description": "The act of registering to be a user of a service, product or web page.\n\nRelated actions:\n\n\nJoinAction: Unlike JoinAction, RegisterAction implies you are registering to be a user of a service, not a group/team of people.\n[FollowAction]]: Unlike FollowAction, RegisterAction doesn't imply that the agent is expecting to poll for updates from the object..."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:SubscribeAction",
                     "name": "SubscribeAction",
                     "rdfs:subClassOf": "schema:InteractAction",
                     "description": "The act of forming a personal connection with someone/something (object) unidirectionally/asymmetrically to get updates pushed to.\n\nRelated actions:\n\n\nFollowAction: Unlike FollowAction, SubscribeAction implies that the subscriber acts as a passive agent being constantly/actively pushed for updates..."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:UnRegisterAction",
                     "name": "UnRegisterAction",
                     "rdfs:subClassOf": "schema:InteractAction",
                     "description": "The act of un-registering from a service.\n\nRelated actions:\n\n\nRegisterAction: antonym of UnRegisterAction.\nLeaveAction: Unlike LeaveAction, UnRegisterAction implies that you are unregistering from a service you werer previously registered, rather than leaving a team/group of people."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MoveAction",
               "name": "MoveAction",
               "rdfs:subClassOf": "schema:Action",
               "description": "The act of an agent relocating to a place.\n\nRelated actions:\n\n\nTransferAction: Unlike TransferAction, the subject of the move is a living Person or Organization rather than an inanimate object.\n",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ArriveAction",
                     "name": "ArriveAction",
                     "rdfs:subClassOf": "schema:MoveAction",
                     "description": "The act of arriving at a place. An agent arrives at a destination from a fromLocation, optionally with participants."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DepartAction",
                     "name": "DepartAction",
                     "rdfs:subClassOf": "schema:MoveAction",
                     "description": "The act of  departing from a place. An agent departs from an fromLocation for a destination, optionally with participants."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TravelAction",
                     "name": "TravelAction",
                     "rdfs:subClassOf": "schema:MoveAction",
                     "description": "The act of traveling from an fromLocation to a destination by a specified mode of transport, optionally with participants."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:OrganizeAction",
               "name": "OrganizeAction",
               "rdfs:subClassOf": "schema:Action",
               "description": "The act of manipulating/administering/supervising/controlling one or more objects.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:AllocateAction",
                     "name": "AllocateAction",
                     "rdfs:subClassOf": "schema:OrganizeAction",
                     "description": "The act of organizing tasks/objects/events by associating resources to it.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AcceptAction",
                           "name": "AcceptAction",
                           "rdfs:subClassOf": "schema:AllocateAction",
                           "description": "The act of committing to/adopting an object.\n\nRelated actions:\n\n\nRejectAction: The antonym of AcceptAction.\n"
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AssignAction",
                           "name": "AssignAction",
                           "rdfs:subClassOf": "schema:AllocateAction",
                           "description": "The act of allocating an action/event/task to some destination (someone or something)."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AuthorizeAction",
                           "name": "AuthorizeAction",
                           "rdfs:subClassOf": "schema:AllocateAction",
                           "description": "The act of granting permission to an object."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:RejectAction",
                           "name": "RejectAction",
                           "rdfs:subClassOf": "schema:AllocateAction",
                           "description": "The act of rejecting to/adopting an object.\n\nRelated actions:\n\n\nAcceptAction: The antonym of RejectAction.\n"
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ApplyAction",
                     "name": "ApplyAction",
                     "rdfs:subClassOf": "schema:OrganizeAction",
                     "description": "The act of registering to an organization/service without the guarantee to receive it.\n\nRelated actions:\n\n\nRegisterAction: Unlike RegisterAction, ApplyAction has no guarantees that the application will be accepted.\n"
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BookmarkAction",
                     "name": "BookmarkAction",
                     "rdfs:subClassOf": "schema:OrganizeAction",
                     "description": "An agent bookmarks/flags/labels/tags/marks an object."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PlanAction",
                     "name": "PlanAction",
                     "rdfs:subClassOf": "schema:OrganizeAction",
                     "description": "The act of planning the execution of an event/task/action/reservation/plan to a future date.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:CancelAction",
                           "name": "CancelAction",
                           "rdfs:subClassOf": "schema:PlanAction",
                           "description": "The act of asserting that a future event/action is no longer going to happen.\n\nRelated actions:\n\n\nConfirmAction: The antonym of CancelAction.\n"
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ReserveAction",
                           "name": "ReserveAction",
                           "rdfs:subClassOf": "schema:PlanAction",
                           "description": "Reserving a concrete object.\n\nRelated actions:\n\n\nScheduleAction: Unlike ScheduleAction, ReserveAction reserves concrete objects (e.g. a table, a hotel) towards a time slot / spatial allocation.\n"
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ScheduleAction",
                           "name": "ScheduleAction",
                           "rdfs:subClassOf": "schema:PlanAction",
                           "description": "Scheduling future actions, events, or tasks.\n\nRelated actions:\n\n\nReserveAction: Unlike ReserveAction, ScheduleAction allocates future actions (e.g. an event, a task, etc) towards a time slot / spatial allocation.\n"
                        }
                     ]
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:PlayAction",
               "name": "PlayAction",
               "rdfs:subClassOf": "schema:Action",
               "description": "The act of playing/exercising/training/performing for enjoyment, leisure, recreation, Competition or exercise.\n\nRelated actions:\n\n\nListenAction: Unlike ListenAction (which is under ConsumeAction), PlayAction refers to performing for an audience or at an event, rather than consuming music...",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ExerciseAction",
                     "name": "ExerciseAction",
                     "rdfs:subClassOf": "schema:PlayAction",
                     "description": "The act of participating in exertive activity for the purposes of improving health and fitness."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PerformAction",
                     "name": "PerformAction",
                     "rdfs:subClassOf": "schema:PlayAction",
                     "description": "The act of participating in performance arts."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:SearchAction",
               "name": "SearchAction",
               "rdfs:subClassOf": "schema:Action",
               "description": "The act of searching for an object.\n\nRelated actions:\n\n\nFindAction: SearchAction generally leads to a FindAction, but not necessarily.\n"
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:SeekToAction",
               "name": "SeekToAction",
               "rdfs:subClassOf": "schema:Action",
               "description": "This is the Action of navigating to a specific startOffset timestamp within a VideoObject, typically represented with a URL template structure.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:SolveMathAction",
               "name": "SolveMathAction",
               "rdfs:subClassOf": "schema:Action",
               "description": "The action that takes in a math expression and directs users to a page potentially capable of solving/simplifying that expression.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:TradeAction",
               "name": "TradeAction",
               "rdfs:subClassOf": "schema:Action",
               "description": "The act of participating in an exchange of goods and services for monetary compensation. An agent trades an object, product or service with a participant in exchange for a one time or periodic payment.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BuyAction",
                     "name": "BuyAction",
                     "rdfs:subClassOf": "schema:TradeAction",
                     "description": "The act of giving money to a seller in exchange for goods or services rendered. An agent buys an object, product, or service from a seller for a price. Reciprocal of SellAction."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DonateAction",
                     "name": "DonateAction",
                     "rdfs:subClassOf": "schema:TradeAction",
                     "description": "The act of providing goods, services, or money without compensation, often for philanthropic reasons."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:OrderAction",
                     "name": "OrderAction",
                     "rdfs:subClassOf": "schema:TradeAction",
                     "description": "An agent orders an object/product/service to be delivered/sent."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PayAction",
                     "name": "PayAction",
                     "rdfs:subClassOf": "schema:TradeAction",
                     "description": "An agent pays a price to a participant."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PreOrderAction",
                     "name": "PreOrderAction",
                     "rdfs:subClassOf": "schema:TradeAction",
                     "description": "An agent orders a (not yet released) object/product/service to be delivered/sent."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:QuoteAction",
                     "name": "QuoteAction",
                     "rdfs:subClassOf": "schema:TradeAction",
                     "description": "An agent quotes/estimates/appraises an object/product/service with a price at a location/store."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:RentAction",
                     "name": "RentAction",
                     "rdfs:subClassOf": "schema:TradeAction",
                     "description": "The act of giving money in return for temporary use, but not ownership, of an object such as a vehicle or property. For example, an agent rents a property from a landlord in exchange for a periodic payment."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:SellAction",
                     "name": "SellAction",
                     "rdfs:subClassOf": "schema:TradeAction",
                     "description": "The act of taking money from a buyer in exchange for goods or services rendered. An agent sells an object, product, or service to a buyer for a price. Reciprocal of BuyAction."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TipAction",
                     "name": "TipAction",
                     "rdfs:subClassOf": "schema:TradeAction",
                     "description": "The act of giving money voluntarily to a beneficiary in recognition of services rendered."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:TransferAction",
               "name": "TransferAction",
               "rdfs:subClassOf": "schema:Action",
               "description": "The act of transferring/moving (abstract or concrete) animate or inanimate objects from one place to another.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BorrowAction",
                     "name": "BorrowAction",
                     "rdfs:subClassOf": "schema:TransferAction",
                     "description": "The act of obtaining an object under an agreement to return it at a later date. Reciprocal of LendAction.\n\nRelated actions:\n\n\nLendAction: Reciprocal of BorrowAction.\n"
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DownloadAction",
                     "name": "DownloadAction",
                     "rdfs:subClassOf": "schema:TransferAction",
                     "description": "The act of downloading an object."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:GiveAction",
                     "name": "GiveAction",
                     "rdfs:subClassOf": "schema:TransferAction",
                     "description": "The act of transferring ownership of an object to a destination. Reciprocal of TakeAction.\n\nRelated actions:\n\n\nTakeAction: Reciprocal of GiveAction.\nSendAction: Unlike SendAction, GiveAction implies that ownership is being transferred (e.g. I may send my laptop to you, but that doesn't mean I'm giving it to you)."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:LendAction",
                     "name": "LendAction",
                     "rdfs:subClassOf": "schema:TransferAction",
                     "description": "The act of providing an object under an agreement that it will be returned at a later date. Reciprocal of BorrowAction.\n\nRelated actions:\n\n\nBorrowAction: Reciprocal of LendAction.\n"
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MoneyTransfer",
                     "name": "MoneyTransfer",
                     "rdfs:subClassOf": "schema:TransferAction",
                     "description": "The act of transferring money from one place to another place. This may occur electronically or physically.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ReceiveAction",
                     "name": "ReceiveAction",
                     "rdfs:subClassOf": "schema:TransferAction",
                     "description": "The act of physically/electronically taking delivery of an object that has been transferred from an origin to a destination. Reciprocal of SendAction.\n\nRelated actions:\n\n\nSendAction: The reciprocal of ReceiveAction.\nTakeAction: Unlike TakeAction, ReceiveAction does not imply that the ownership has been transfered (e..."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ReturnAction",
                     "name": "ReturnAction",
                     "rdfs:subClassOf": "schema:TransferAction",
                     "description": "The act of returning to the origin that which was previously received (concrete objects) or taken (ownership)."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:SendAction",
                     "name": "SendAction",
                     "rdfs:subClassOf": "schema:TransferAction",
                     "description": "The act of physically/electronically dispatching an object for transfer from an origin to a destination.Related actions:\n\n\nReceiveAction: The reciprocal of SendAction.\nGiveAction: Unlike GiveAction, SendAction does not imply the transfer of ownership (e..."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TakeAction",
                     "name": "TakeAction",
                     "rdfs:subClassOf": "schema:TransferAction",
                     "description": "The act of gaining ownership of an object from an origin. Reciprocal of GiveAction.\n\nRelated actions:\n\n\nGiveAction: The reciprocal of TakeAction.\nReceiveAction: Unlike ReceiveAction, TakeAction implies that ownership has been transfered.\n"
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:UpdateAction",
               "name": "UpdateAction",
               "rdfs:subClassOf": "schema:Action",
               "description": "The act of managing by changing/editing the state of the object.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:AddAction",
                     "name": "AddAction",
                     "rdfs:subClassOf": "schema:UpdateAction",
                     "description": "The act of editing by adding an object to a collection.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:InsertAction",
                           "name": "InsertAction",
                           "rdfs:subClassOf": "schema:AddAction",
                           "description": "The act of adding at a specific location in an ordered collection.",
                           "children": [
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:AppendAction",
                                 "name": "AppendAction",
                                 "rdfs:subClassOf": "schema:InsertAction",
                                 "description": "The act of inserting at the end if an ordered collection."
                              },
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:PrependAction",
                                 "name": "PrependAction",
                                 "rdfs:subClassOf": "schema:InsertAction",
                                 "description": "The act of inserting at the beginning if an ordered collection."
                              }
                           ]
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DeleteAction",
                     "name": "DeleteAction",
                     "rdfs:subClassOf": "schema:UpdateAction",
                     "description": "The act of editing a recipient by removing one of its objects."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ReplaceAction",
                     "name": "ReplaceAction",
                     "rdfs:subClassOf": "schema:UpdateAction",
                     "description": "The act of editing a recipient by replacing an old object with a new object."
                  }
               ]
            }
         ]
      },
      {
         "@type": "rdfs:Class",
         "@id": "schema:BioChemEntity",
         "name": "BioChemEntity",
         "rdfs:subClassOf": "schema:Thing",
         "description": "Any biological, chemical, or biochemical thing. For example: a protein; a gene; a chemical; a synthetic chemical.",
         "pending": true,
         "children": [
            {
               "@type": "rdfs:Class",
               "@id": "schema:ChemicalSubstance",
               "name": "ChemicalSubstance",
               "rdfs:subClassOf": "schema:BioChemEntity",
               "description": "A chemical substance is 'a portion of matter of constant composition, composed of molecular entities of the same type or of different types' (source: ChEBI:59999).",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Gene",
               "name": "Gene",
               "rdfs:subClassOf": "schema:BioChemEntity",
               "description": "A discrete unit of inheritance which affects one or more biological traits (Source: https://en.wikipedia.org/wiki/Gene). Examples include FOXP2 (Forkhead box protein P2), SCARNA21 (small Cajal body-specific RNA 21), A- (agouti genotype).",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MolecularEntity",
               "name": "MolecularEntity",
               "rdfs:subClassOf": "schema:BioChemEntity",
               "description": "Any constitutionally or isotopically distinct atom, molecule, ion, ion pair, radical, radical ion, complex, conformer etc., identifiable as a separately distinguishable entity.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Protein",
               "name": "Protein",
               "rdfs:subClassOf": "schema:BioChemEntity",
               "description": "Protein is here used in its widest possible definition, as classes of amino acid based molecules. Amyloid-beta Protein in human (UniProt P05067), eukaryota (e.g. an OrthoDB group) or even a single molecule that one can point to are all of type schema:Protein...",
               "pending": true
            }
         ]
      },
      {
         "@type": "rdfs:Class",
         "@id": "schema:CreativeWork",
         "name": "CreativeWork",
         "rdfs:subClassOf": "schema:Thing",
         "description": "The most generic kind of creative work, including books, movies, photographs, software programs, etc.",
         "children": [
            {
               "@type": "rdfs:Class",
               "@id": "schema:AmpStory",
               "name": "AmpStory",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A creative work with a visual storytelling format intended to be viewed online, particularly on mobile devices.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ArchiveComponent",
               "name": "ArchiveComponent",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "An intangible type to be applied to any archive content, carrying with it a set of properties required to describe archival items and collections.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Article",
               "name": "Article",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "An article, such as a news article or piece of investigative report. Newspapers and magazines have articles of many different types and this is intended to cover them all.\n\nSee also blog post.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:AdvertiserContentArticle",
                     "name": "AdvertiserContentArticle",
                     "rdfs:subClassOf": "schema:Article",
                     "description": "An Article that an external entity has paid to place or to produce to its specifications. Includes advertorials, sponsored content, native advertising and other paid content.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:NewsArticle",
                     "name": "NewsArticle",
                     "rdfs:subClassOf": "schema:Article",
                     "description": "A NewsArticle is an article whose content reports news, or provides background context and supporting materials for understanding the news.\n\nA more detailed overview of schema.org News markup is also available.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AnalysisNewsArticle",
                           "name": "AnalysisNewsArticle",
                           "rdfs:subClassOf": "schema:NewsArticle",
                           "description": "An AnalysisNewsArticle is a NewsArticle that, while based on factual reporting, incorporates the expertise of the author/producer, offering interpretations and conclusions.",
                           "pending": true
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AskPublicNewsArticle",
                           "name": "AskPublicNewsArticle",
                           "rdfs:subClassOf": "schema:NewsArticle",
                           "description": "A NewsArticle expressing an open call by a NewsMediaOrganization asking the public for input, insights, clarifications, anecdotes, documentation, etc., on an issue, for reporting purposes.",
                           "pending": true
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:BackgroundNewsArticle",
                           "name": "BackgroundNewsArticle",
                           "rdfs:subClassOf": "schema:NewsArticle",
                           "description": "A NewsArticle providing historical context, definition and detail on a specific topic (aka \"explainer\" or \"backgrounder\"). For example, an in-depth article or frequently-asked-questions (FAQ) document on topics such as Climate Change or the European Union...",
                           "pending": true
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:OpinionNewsArticle",
                           "name": "OpinionNewsArticle",
                           "rdfs:subClassOf": "schema:NewsArticle",
                           "description": "An OpinionNewsArticle is a NewsArticle that primarily expresses opinions rather than journalistic reporting of news and events. For example, a NewsArticle consisting of a column or Blog/BlogPosting entry in the Opinions section of a news publication.",
                           "pending": true
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ReportageNewsArticle",
                           "name": "ReportageNewsArticle",
                           "rdfs:subClassOf": "schema:NewsArticle",
                           "description": "The ReportageNewsArticle type is a subtype of NewsArticle representing\n news articles which are the result of journalistic news reporting conventions.\n\nIn practice many news publishers produce a wide variety of article types, many of which might be considered a NewsArticle but not a ReportageNewsArticle...",
                           "pending": true
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ReviewNewsArticle",
                           "name": "ReviewNewsArticle",
                           "rdfs:subClassOf": [
                              "schema:CriticReview",
                              "schema:NewsArticle"
                           ],
                           "description": "A NewsArticle and CriticReview providing a professional critic's assessment of a service, product, performance, or artistic or literary work.",
                           "pending": true
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Report",
                     "name": "Report",
                     "rdfs:subClassOf": "schema:Article",
                     "description": "A Report generated by governmental or non-governmental organization."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:SatiricalArticle",
                     "name": "SatiricalArticle",
                     "rdfs:subClassOf": "schema:Article",
                     "description": "An Article whose content is primarily [satirical] in nature, i.e. unlikely to be literally true. A satirical article is sometimes but not necessarily also a NewsArticle. ScholarlyArticles are also sometimes satirized.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ScholarlyArticle",
                     "name": "ScholarlyArticle",
                     "rdfs:subClassOf": "schema:Article",
                     "description": "A scholarly article.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MedicalScholarlyArticle",
                           "name": "MedicalScholarlyArticle",
                           "rdfs:subClassOf": "schema:ScholarlyArticle",
                           "description": "A scholarly article in the medical domain."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:SocialMediaPosting",
                     "name": "SocialMediaPosting",
                     "rdfs:subClassOf": "schema:Article",
                     "description": "A post to a social media platform, including blog posts, tweets, Facebook posts, etc.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:BlogPosting",
                           "name": "BlogPosting",
                           "rdfs:subClassOf": "schema:SocialMediaPosting",
                           "description": "A blog post.",
                           "children": [
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:LiveBlogPosting",
                                 "name": "LiveBlogPosting",
                                 "rdfs:subClassOf": "schema:BlogPosting",
                                 "description": "A LiveBlogPosting is a BlogPosting intended to provide a rolling textual coverage of an ongoing event through continuous updates."
                              }
                           ]
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:DiscussionForumPosting",
                           "name": "DiscussionForumPosting",
                           "rdfs:subClassOf": "schema:SocialMediaPosting",
                           "description": "A posting to a discussion forum."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TechArticle",
                     "name": "TechArticle",
                     "rdfs:subClassOf": "schema:Article",
                     "description": "A technical article - Example: How-to (task) topics, step-by-step, procedural troubleshooting, specifications, etc.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:APIReference",
                           "name": "APIReference",
                           "rdfs:subClassOf": "schema:TechArticle",
                           "description": "Reference documentation for application programming interfaces (APIs)."
                        }
                     ]
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Atlas",
               "name": "Atlas",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A collection or bound volume of maps, charts, plates or tables, physical or in media form illustrating any subject."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Blog",
               "name": "Blog",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A blog, sometimes known as a \"weblog\". Note that the individual posts (BlogPostings) in a Blog are often colloqually referred to by the same term."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Book",
               "name": "Book",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A book.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Audiobook",
                     "name": "Audiobook",
                     "rdfs:subClassOf": [
                        "schema:AudioObject",
                        "schema:Book"
                     ],
                     "description": "An audiobook."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Chapter",
               "name": "Chapter",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "One of the sections into which a book is divided. A chapter usually has a section number or a name."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Claim",
               "name": "Claim",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A Claim in Schema.org represents a specific, factually-oriented claim that could be the itemReviewed in a ClaimReview. The content of a claim can be summarized with the text property. Variations on well known claims can have their common identity indicated via sameAs links, and summarized with a name...",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Clip",
               "name": "Clip",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A short TV or radio program or a segment/part of a program.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MovieClip",
                     "name": "MovieClip",
                     "rdfs:subClassOf": "schema:Clip",
                     "description": "A short segment/part of a movie."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:RadioClip",
                     "name": "RadioClip",
                     "rdfs:subClassOf": "schema:Clip",
                     "description": "A short radio program or a segment/part of a radio program."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TVClip",
                     "name": "TVClip",
                     "rdfs:subClassOf": "schema:Clip",
                     "description": "A short TV program or a segment/part of a TV program."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:VideoGameClip",
                     "name": "VideoGameClip",
                     "rdfs:subClassOf": "schema:Clip",
                     "description": "A short segment/part of a video game."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Code",
               "name": "Code",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "Computer programming source code. Example: Full (compile ready) solutions, code snippet samples, scripts, templates."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Collection",
               "name": "Collection",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A collection of items e.g. creative works or products.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ProductCollection",
                     "name": "ProductCollection",
                     "rdfs:subClassOf": [
                        "schema:Collection",
                        "schema:Product"
                     ],
                     "description": "A set of products (either ProductGroups or specific variants) that are listed together e.g. in an Offer.",
                     "pending": true
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ComicStory",
               "name": "ComicStory",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "The term \"story\" is any indivisible, re-printable\n        unit of a comic, including the interior stories, covers, and backmatter. Most\n        comics have at least two stories: a cover (ComicCoverArt) and an interior story.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ComicCoverArt",
                     "name": "ComicCoverArt",
                     "rdfs:subClassOf": [
                        "schema:ComicStory",
                        "schema:CoverArt"
                     ],
                     "description": "The artwork on the cover of a comic."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Comment",
               "name": "Comment",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A comment on an item - for example, a comment on a blog post. The comment's content is expressed via the text property, and its topic via about, properties shared with all CreativeWorks.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Answer",
                     "name": "Answer",
                     "rdfs:subClassOf": "schema:Comment",
                     "description": "An answer offered to a question; perhaps correct, perhaps opinionated or wrong."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:CorrectionComment",
                     "name": "CorrectionComment",
                     "rdfs:subClassOf": "schema:Comment",
                     "description": "A comment that corrects CreativeWork.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Question",
                     "name": "Question",
                     "rdfs:subClassOf": "schema:Comment",
                     "description": "A specific question - e.g. from a user seeking answers online, or collected in a Frequently Asked Questions (FAQ) document."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Conversation",
               "name": "Conversation",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "One or more messages between organizations or people on a particular topic. Individual messages can be linked to the conversation with isPartOf or hasPart properties."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Course",
               "name": "Course",
               "rdfs:subClassOf": [
                  "schema:CreativeWork",
                  "schema:LearningResource"
               ],
               "description": "A description of an educational course which may be offered as distinct instances at which take place at different times or take place at different locations, or be offered through different media or modes of study. An educational course is a sequence of one or more educational events and/or creative works which aims to build knowledge, competence or ability of learners."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:CreativeWorkSeason",
               "name": "CreativeWorkSeason",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A media season e.g. tv, radio, video game etc.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PodcastSeason",
                     "name": "PodcastSeason",
                     "rdfs:subClassOf": "schema:CreativeWorkSeason",
                     "description": "A single season of a podcast. Many podcasts do not break down into separate seasons. In that case, PodcastSeries should be used.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:RadioSeason",
                     "name": "RadioSeason",
                     "rdfs:subClassOf": "schema:CreativeWorkSeason",
                     "description": "Season dedicated to radio broadcast and associated online delivery."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TVSeason",
                     "name": "TVSeason",
                     "rdfs:subClassOf": [
                        "schema:CreativeWork",
                        "schema:CreativeWorkSeason"
                     ],
                     "description": "Season dedicated to TV broadcast and associated online delivery."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:CreativeWorkSeries",
               "name": "CreativeWorkSeries",
               "rdfs:subClassOf": [
                  "schema:CreativeWork",
                  "schema:Series"
               ],
               "description": "A CreativeWorkSeries in schema.org is a group of related items, typically but not necessarily of the same kind. CreativeWorkSeries are usually organized into some order, often chronological. Unlike ItemList which is a general purpose data structure for lists of things, the emphasis with CreativeWorkSeries is on published materials (written e...",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BookSeries",
                     "name": "BookSeries",
                     "rdfs:subClassOf": "schema:CreativeWorkSeries",
                     "description": "A series of books. Included books can be indicated with the hasPart property."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MovieSeries",
                     "name": "MovieSeries",
                     "rdfs:subClassOf": "schema:CreativeWorkSeries",
                     "description": "A series of movies. Included movies can be indicated with the hasPart property."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Periodical",
                     "name": "Periodical",
                     "rdfs:subClassOf": "schema:CreativeWorkSeries",
                     "description": "A publication in any medium issued in successive parts bearing numerical or chronological designations and intended, such as a magazine, scholarly journal, or newspaper to continue indefinitely.\n\nSee also blog post.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ComicSeries",
                           "name": "ComicSeries",
                           "rdfs:subClassOf": "schema:Periodical",
                           "description": "A sequential publication of comic stories under a\n        unifying title, for example \"The Amazing Spider-Man\" or \"Groo the\n        Wanderer\"."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Newspaper",
                           "name": "Newspaper",
                           "rdfs:subClassOf": "schema:Periodical",
                           "description": "A publication containing information about varied topics that are pertinent to general information, a geographic area, or a specific subject matter (i.e. business, culture, education). Often published daily."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PodcastSeries",
                     "name": "PodcastSeries",
                     "rdfs:subClassOf": "schema:CreativeWorkSeries",
                     "description": "A podcast is an episodic series of digital audio or video files which a user can download and listen to.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:RadioSeries",
                     "name": "RadioSeries",
                     "rdfs:subClassOf": "schema:CreativeWorkSeries",
                     "description": "CreativeWorkSeries dedicated to radio broadcast and associated online delivery."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TVSeries",
                     "name": "TVSeries",
                     "rdfs:subClassOf": [
                        "schema:CreativeWork",
                        "schema:CreativeWorkSeries"
                     ],
                     "description": "CreativeWorkSeries dedicated to TV broadcast and associated online delivery."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:VideoGameSeries",
                     "name": "VideoGameSeries",
                     "rdfs:subClassOf": "schema:CreativeWorkSeries",
                     "description": "A video game series."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:DataCatalog",
               "name": "DataCatalog",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A collection of datasets."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Dataset",
               "name": "Dataset",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A body of structured information describing some topic(s) of interest.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DataFeed",
                     "name": "DataFeed",
                     "rdfs:subClassOf": "schema:Dataset",
                     "description": "A single feed providing structured information about one or more entities or topics.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:CompleteDataFeed",
                           "name": "CompleteDataFeed",
                           "rdfs:subClassOf": "schema:DataFeed",
                           "description": "A CompleteDataFeed is a DataFeed whose standard representation includes content for every item currently in the feed.\n\nThis is the equivalent of Atom's element as defined in Feed Paging and Archiving RFC 5005, For example (and as defined for Atom), when using data from a feed that represents a collection of items that varies over time (e...",
                           "pending": true
                        }
                     ]
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:DefinedTermSet",
               "name": "DefinedTermSet",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A set of defined terms for example a set of categories or a classification scheme, a glossary, dictionary or enumeration.",
               "pending": true,
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:CategoryCodeSet",
                     "name": "CategoryCodeSet",
                     "rdfs:subClassOf": "schema:DefinedTermSet",
                     "description": "A set of Category Code values.",
                     "pending": true
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Diet",
               "name": "Diet",
               "rdfs:subClassOf": [
                  "schema:CreativeWork",
                  "schema:LifestyleModification"
               ],
               "description": "A strategy of regulating the intake of food to achieve or maintain a specific health-related goal."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:DigitalDocument",
               "name": "DigitalDocument",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "An electronic file or document.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:NoteDigitalDocument",
                     "name": "NoteDigitalDocument",
                     "rdfs:subClassOf": "schema:DigitalDocument",
                     "description": "A file containing a note, primarily for the author."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PresentationDigitalDocument",
                     "name": "PresentationDigitalDocument",
                     "rdfs:subClassOf": "schema:DigitalDocument",
                     "description": "A file containing slides or used for a presentation."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:SpreadsheetDigitalDocument",
                     "name": "SpreadsheetDigitalDocument",
                     "rdfs:subClassOf": "schema:DigitalDocument",
                     "description": "A spreadsheet file."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TextDigitalDocument",
                     "name": "TextDigitalDocument",
                     "rdfs:subClassOf": "schema:DigitalDocument",
                     "description": "A file composed primarily of text."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Drawing",
               "name": "Drawing",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A picture or diagram made with a pencil, pen, or crayon rather than paint.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:EducationalOccupationalCredential",
               "name": "EducationalOccupationalCredential",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "An educational or occupational credential. A diploma, academic degree, certification, qualification, badge, etc., that may be awarded to a person or other entity that meets the requirements defined by the credentialer.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Episode",
               "name": "Episode",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A media episode (e.g. TV, radio, video game) which can be part of a series or season.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PodcastEpisode",
                     "name": "PodcastEpisode",
                     "rdfs:subClassOf": "schema:Episode",
                     "description": "A single episode of a podcast series.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:RadioEpisode",
                     "name": "RadioEpisode",
                     "rdfs:subClassOf": "schema:Episode",
                     "description": "A radio episode which can be part of a series or season."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TVEpisode",
                     "name": "TVEpisode",
                     "rdfs:subClassOf": "schema:Episode",
                     "description": "A TV episode which can be part of a series or season."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ExercisePlan",
               "name": "ExercisePlan",
               "rdfs:subClassOf": [
                  "schema:CreativeWork",
                  "schema:PhysicalActivity"
               ],
               "description": "Fitness-related activity designed for a specific health-related purpose, including defined exercise routines as well as activity prescribed by a clinician."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Game",
               "name": "Game",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "The Game type represents things which are games. These are typically rule-governed recreational activities, e.g. role-playing games in which players assume the role of characters in a fictional setting.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:VideoGame",
                     "name": "VideoGame",
                     "rdfs:subClassOf": [
                        "schema:Game",
                        "schema:SoftwareApplication"
                     ],
                     "description": "A video game is an electronic game that involves human interaction with a user interface to generate visual feedback on a video device."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Guide",
               "name": "Guide",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "Guide is a page or article that recommend specific products or services, or aspects of a thing for a user to consider. A Guide may represent a Buying Guide and detail aspects of products or services for a user to consider. A Guide may represent a Product Guide and recommend specific products or services...",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:HowTo",
               "name": "HowTo",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "Instructions that explain how to achieve a result by performing a sequence of steps.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Recipe",
                     "name": "Recipe",
                     "rdfs:subClassOf": "schema:HowTo",
                     "description": "A recipe. For dietary restrictions covered by the recipe, a few common restrictions are enumerated via suitableForDiet. The keywords property can also be used to add more detail."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:HowToDirection",
               "name": "HowToDirection",
               "rdfs:subClassOf": [
                  "schema:CreativeWork",
                  "schema:ListItem"
               ],
               "description": "A direction indicating a single action to do in the instructions for how to achieve a result."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:HowToSection",
               "name": "HowToSection",
               "rdfs:subClassOf": [
                  "schema:CreativeWork",
                  "schema:ItemList",
                  "schema:ListItem"
               ],
               "description": "A sub-grouping of steps in the instructions for how to achieve a result (e.g. steps for making a pie crust within a pie recipe)."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:HowToStep",
               "name": "HowToStep",
               "rdfs:subClassOf": [
                  "schema:CreativeWork",
                  "schema:ItemList",
                  "schema:ListItem"
               ],
               "description": "A step in the instructions for how to achieve a result. It is an ordered list with HowToDirection and/or HowToTip items."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:HowToTip",
               "name": "HowToTip",
               "rdfs:subClassOf": [
                  "schema:CreativeWork",
                  "schema:ListItem"
               ],
               "description": "An explanation in the instructions for how to achieve a result. It provides supplementary information about a technique, supply, author's preference, etc. It can explain what could be done, or what should not be done, but doesn't specify what should be done (see HowToDirection)."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:HyperToc",
               "name": "HyperToc",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A HyperToc represents a hypertext table of contents for complex media objects, such as VideoObject, AudioObject. Items in the table of contents are indicated using the tocEntry property, and typed HyperTocEntry. For cases where the same larger work is split into multiple files, associatedMedia can be used on individual HyperTocEntry items.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:HyperTocEntry",
               "name": "HyperTocEntry",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A HyperToEntry is an item within a HyperToc, which represents a hypertext table of contents for complex media objects, such as VideoObject, AudioObject. The media object itself is indicated using associatedMedia. Each section of interest within that content can be described with a HyperTocEntry, with associated startOffset and endOffset...",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:LearningResource",
               "name": "LearningResource",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "The LearningResource type can be used to indicate CreativeWorks (whether physical or digital) that have a particular and explicit orientation towards learning, education, skill acquisition, and other educational purposes.\n\nLearningResource is expected to be used as an addition to a primary type such as Book, VideoObject, Product etc...",
               "pending": true,
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Course",
                     "name": "Course",
                     "rdfs:subClassOf": [
                        "schema:CreativeWork",
                        "schema:LearningResource"
                     ],
                     "description": "A description of an educational course which may be offered as distinct instances at which take place at different times or take place at different locations, or be offered through different media or modes of study. An educational course is a sequence of one or more educational events and/or creative works which aims to build knowledge, competence or ability of learners."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Quiz",
                     "name": "Quiz",
                     "rdfs:subClassOf": "schema:LearningResource",
                     "description": "Quiz: A test of knowledge, skills and abilities.",
                     "pending": true
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Legislation",
               "name": "Legislation",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A legal document such as an act, decree, bill, etc. (enforceable or not) or a component of a legal act (like an article).",
               "pending": true,
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:LegislationObject",
                     "name": "LegislationObject",
                     "rdfs:subClassOf": [
                        "schema:Legislation",
                        "schema:MediaObject"
                     ],
                     "description": "A specific object or file containing a Legislation. Note that the same Legislation can be published in multiple files. For example, a digitally signed PDF, a plain PDF and an HTML version.",
                     "pending": true
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Manuscript",
               "name": "Manuscript",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A book, document, or piece of music written by hand rather than typed or printed.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Map",
               "name": "Map",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A map."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MathSolver",
               "name": "MathSolver",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A math solver which is capable of solving a subset of mathematical problems.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MediaObject",
               "name": "MediaObject",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A media object, such as an image, video, or audio object embedded in a web page or a downloadable dataset i.e. DataDownload. Note that a creative work may have many media objects associated with it on the same web page. For example, a page about a single song (MusicRecording) may have a music video (VideoObject), and a high and low bandwidth audio stream (2 AudioObject's).",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:3DModel",
                     "name": "3DModel",
                     "rdfs:subClassOf": "schema:MediaObject",
                     "description": "A 3D model represents some kind of 3D content, which may have encodings in one or more MediaObjects. Many 3D formats are available (e.g. see Wikipedia); specific encoding formats can be represented using the encodingFormat property applied to the relevant MediaObject...",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:AudioObject",
                     "name": "AudioObject",
                     "rdfs:subClassOf": "schema:MediaObject",
                     "description": "An audio file.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AudioObjectSnapshot",
                           "name": "AudioObjectSnapshot",
                           "rdfs:subClassOf": "schema:AudioObject",
                           "description": "A specific and exact (byte-for-byte) version of an AudioObject. Two byte-for-byte identical files, for the purposes of this type, considered identical. If they have different embedded metadata the files will differ. Different external facts about the files, e...",
                           "pending": true
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Audiobook",
                           "name": "Audiobook",
                           "rdfs:subClassOf": [
                              "schema:AudioObject",
                              "schema:Book"
                           ],
                           "description": "An audiobook."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DataDownload",
                     "name": "DataDownload",
                     "rdfs:subClassOf": "schema:MediaObject",
                     "description": "A dataset in downloadable form."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ImageObject",
                     "name": "ImageObject",
                     "rdfs:subClassOf": "schema:MediaObject",
                     "description": "An image file.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Barcode",
                           "name": "Barcode",
                           "rdfs:subClassOf": "schema:ImageObject",
                           "description": "An image of a visual machine-readable code such as a barcode or QR code."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ImageObjectSnapshot",
                           "name": "ImageObjectSnapshot",
                           "rdfs:subClassOf": "schema:ImageObject",
                           "description": "A specific and exact (byte-for-byte) version of an ImageObject. Two byte-for-byte identical files, for the purposes of this type, considered identical. If they have different embedded metadata (e.g. XMP, EXIF) the files will differ. Different external facts about the files, e...",
                           "pending": true
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:LegislationObject",
                     "name": "LegislationObject",
                     "rdfs:subClassOf": [
                        "schema:Legislation",
                        "schema:MediaObject"
                     ],
                     "description": "A specific object or file containing a Legislation. Note that the same Legislation can be published in multiple files. For example, a digitally signed PDF, a plain PDF and an HTML version.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MusicVideoObject",
                     "name": "MusicVideoObject",
                     "rdfs:subClassOf": "schema:MediaObject",
                     "description": "A music video file."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:VideoObject",
                     "name": "VideoObject",
                     "rdfs:subClassOf": "schema:MediaObject",
                     "description": "A video file.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:VideoObjectSnapshot",
                           "name": "VideoObjectSnapshot",
                           "rdfs:subClassOf": "schema:VideoObject",
                           "description": "A specific and exact (byte-for-byte) version of a VideoObject. Two byte-for-byte identical files, for the purposes of this type, considered identical. If they have different embedded metadata the files will differ. Different external facts about the files, e...",
                           "pending": true
                        }
                     ]
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MediaReviewItem",
               "name": "MediaReviewItem",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "Represents an item or group of closely related items treated as a unit for the sake of evaluation in a MediaReview. Authorship etc. apply to the items rather than to the curation/grouping or reviewing party.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Menu",
               "name": "Menu",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A structured representation of food or drink items available from a FoodEstablishment."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MenuSection",
               "name": "MenuSection",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A sub-grouping of food or drink items in a menu. E.g. courses (such as 'Dinner', 'Breakfast', etc.), specific type of dishes (such as 'Meat', 'Vegan', 'Drinks', etc.), or some other classification made by the menu provider."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Message",
               "name": "Message",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A single message from a sender to one or more organizations or people.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:EmailMessage",
                     "name": "EmailMessage",
                     "rdfs:subClassOf": "schema:Message",
                     "description": "An email message."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Movie",
               "name": "Movie",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A movie."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MusicComposition",
               "name": "MusicComposition",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A musical composition."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MusicPlaylist",
               "name": "MusicPlaylist",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A collection of music tracks in playlist form.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MusicAlbum",
                     "name": "MusicAlbum",
                     "rdfs:subClassOf": "schema:MusicPlaylist",
                     "description": "A collection of music tracks."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MusicRelease",
                     "name": "MusicRelease",
                     "rdfs:subClassOf": "schema:MusicPlaylist",
                     "description": "A MusicRelease is a specific release of a music album."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MusicRecording",
               "name": "MusicRecording",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A music recording (track), usually a single song."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Painting",
               "name": "Painting",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A painting."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Photograph",
               "name": "Photograph",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A photograph."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Play",
               "name": "Play",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A play is a form of literature, usually consisting of dialogue between characters, intended for theatrical performance rather than just reading. Note: A performance of a Play would be a TheaterEvent or BroadcastEvent - the Play being the workPerformed.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Poster",
               "name": "Poster",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A large, usually printed placard, bill, or announcement, often illustrated, that is posted to advertise or publicize something.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:PublicationIssue",
               "name": "PublicationIssue",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A part of a successively published publication such as a periodical or publication volume, often numbered, usually containing a grouping of works such as articles.\n\nSee also blog post.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ComicIssue",
                     "name": "ComicIssue",
                     "rdfs:subClassOf": "schema:PublicationIssue",
                     "description": "Individual comic issues are serially published as\n        part of a larger series. For the sake of consistency, even one-shot issues\n        belong to a series comprised of a single issue. All comic issues can be\n        uniquely identified by: the combination of the name and volume number of the\n        series to which the issue belongs; the issue number; and the variant\n        description of the issue (if any)."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:PublicationVolume",
               "name": "PublicationVolume",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A part of a successively published publication such as a periodical or multi-volume work, often numbered. It may represent a time span, such as a year.\n\nSee also blog post."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Quotation",
               "name": "Quotation",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A quotation. Often but not necessarily from some written work, attributable to a real world author and - if associated with a fictional character - to any fictional Person. Use isBasedOn to link to source/origin. The recordedIn property can be used to reference a Quotation from an Event.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Review",
               "name": "Review",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A review of an item - for example, of a restaurant, movie, or store.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ClaimReview",
                     "name": "ClaimReview",
                     "rdfs:subClassOf": "schema:Review",
                     "description": "A fact-checking review of claims made (or reported) in some creative work (referenced via itemReviewed)."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:CriticReview",
                     "name": "CriticReview",
                     "rdfs:subClassOf": "schema:Review",
                     "description": "A CriticReview is a more specialized form of Review written or published by a source that is recognized for its reviewing activities. These can include online columns, travel and food guides, TV and radio shows, blogs and other independent Web sites. CriticReviews are typically more in-depth and professionally written...",
                     "pending": true,
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ReviewNewsArticle",
                           "name": "ReviewNewsArticle",
                           "rdfs:subClassOf": [
                              "schema:CriticReview",
                              "schema:NewsArticle"
                           ],
                           "description": "A NewsArticle and CriticReview providing a professional critic's assessment of a service, product, performance, or artistic or literary work.",
                           "pending": true
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:EmployerReview",
                     "name": "EmployerReview",
                     "rdfs:subClassOf": "schema:Review",
                     "description": "An EmployerReview is a review of an Organization regarding its role as an employer, written by a current or former employee of that organization.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MediaReview",
                     "name": "MediaReview",
                     "rdfs:subClassOf": "schema:Review",
                     "description": "A MediaReview is a more specialized form of Review dedicated to the evaluation of media content online, typically in the context of fact-checking and misinformation.\n    For more general reviews of media in the broader sense, use UserReview, CriticReview or other Review types...",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Recommendation",
                     "name": "Recommendation",
                     "rdfs:subClassOf": "schema:Review",
                     "description": "Recommendation is a type of Review that suggests or proposes something as the best option or best course of action. Recommendations may be for products or services, or other concrete things, as in the case of a ranked list or product guide. A Guide may list multiple recommendations for different categories...",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:UserReview",
                     "name": "UserReview",
                     "rdfs:subClassOf": "schema:Review",
                     "description": "A review created by an end-user (e.g. consumer, purchaser, attendee etc.), in contrast with CriticReview.",
                     "pending": true
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Sculpture",
               "name": "Sculpture",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A piece of sculpture."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Season",
               "name": "Season",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A media season e.g. tv, radio, video game etc."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:SheetMusic",
               "name": "SheetMusic",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "Printed music, as opposed to performed or recorded music.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ShortStory",
               "name": "ShortStory",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "Short story or tale. A brief work of literature, usually written in narrative prose.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:SoftwareApplication",
               "name": "SoftwareApplication",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A software application.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MobileApplication",
                     "name": "MobileApplication",
                     "rdfs:subClassOf": "schema:SoftwareApplication",
                     "description": "A software application designed specifically to work well on a mobile device such as a telephone."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:VideoGame",
                     "name": "VideoGame",
                     "rdfs:subClassOf": [
                        "schema:Game",
                        "schema:SoftwareApplication"
                     ],
                     "description": "A video game is an electronic game that involves human interaction with a user interface to generate visual feedback on a video device."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:WebApplication",
                     "name": "WebApplication",
                     "rdfs:subClassOf": "schema:SoftwareApplication",
                     "description": "Web applications."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:SoftwareSourceCode",
               "name": "SoftwareSourceCode",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "Computer programming source code. Example: Full (compile ready) solutions, code snippet samples, scripts, templates."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:SpecialAnnouncement",
               "name": "SpecialAnnouncement",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A SpecialAnnouncement combines a simple date-stamped textual information update\n      with contextualized Web links and other structured data.  It represents an information update made by a\n      locally-oriented organization, for example schools, pharmacies, healthcare providers,  community groups, police,\n      local government...",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Statement",
               "name": "Statement",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A statement about something, for example a fun or interesting fact. If known, the main entity this statement is about, can be indicated using mainEntity. For more formal claims (e.g. in Fact Checking), consider using Claim instead. Use the text property to capture the text of the statement.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:TVSeason",
               "name": "TVSeason",
               "rdfs:subClassOf": [
                  "schema:CreativeWork",
                  "schema:CreativeWorkSeason"
               ],
               "description": "Season dedicated to TV broadcast and associated online delivery."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:TVSeries",
               "name": "TVSeries",
               "rdfs:subClassOf": [
                  "schema:CreativeWork",
                  "schema:CreativeWorkSeries"
               ],
               "description": "CreativeWorkSeries dedicated to TV broadcast and associated online delivery."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Thesis",
               "name": "Thesis",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A thesis or dissertation document submitted in support of candidature for an academic degree or professional qualification."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:VisualArtwork",
               "name": "VisualArtwork",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A work of art that is primarily visual in character.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:CoverArt",
                     "name": "CoverArt",
                     "rdfs:subClassOf": "schema:VisualArtwork",
                     "description": "The artwork on the outer surface of a CreativeWork.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ComicCoverArt",
                           "name": "ComicCoverArt",
                           "rdfs:subClassOf": [
                              "schema:ComicStory",
                              "schema:CoverArt"
                           ],
                           "description": "The artwork on the cover of a comic."
                        }
                     ]
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:WebContent",
               "name": "WebContent",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "WebContent is a type representing all WebPage, WebSite and WebPageElement content. It is sometimes the case that detailed distinctions between Web pages, sites and their parts is not always important or obvious. The  WebContent type makes it easier to describe Web-addressable content without requiring such distinctions to always be stated...",
               "pending": true,
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:HealthTopicContent",
                     "name": "HealthTopicContent",
                     "rdfs:subClassOf": "schema:WebContent",
                     "description": "HealthTopicContent is WebContent that is about some aspect of a health topic, e.g. a condition, its symptoms or treatments. Such content may be comprised of several parts or sections and use different types of media. Multiple instances of WebContent (and hence HealthTopicContent) can be related using hasPart / isPartOf where there is some kind of content hierarchy, and their content described with about and mentions e...",
                     "pending": true
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:WebPage",
               "name": "WebPage",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A web page. Every web page is implicitly assumed to be declared to be of type WebPage, so the various properties about that webpage, such as breadcrumb may be used. We recommend explicit declaration if these properties are specified, but if they are found outside of an itemscope, they will be assumed to be about the page.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:AboutPage",
                     "name": "AboutPage",
                     "rdfs:subClassOf": "schema:WebPage",
                     "description": "Web page type: About page."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:CheckoutPage",
                     "name": "CheckoutPage",
                     "rdfs:subClassOf": "schema:WebPage",
                     "description": "Web page type: Checkout page."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:CollectionPage",
                     "name": "CollectionPage",
                     "rdfs:subClassOf": "schema:WebPage",
                     "description": "Web page type: Collection page.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MediaGallery",
                           "name": "MediaGallery",
                           "rdfs:subClassOf": "schema:CollectionPage",
                           "description": "Web page type: Media gallery page. A mixed-media page that can contains media such as images, videos, and other multimedia.",
                           "children": [
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:ImageGallery",
                                 "name": "ImageGallery",
                                 "rdfs:subClassOf": "schema:MediaGallery",
                                 "description": "Web page type: Image gallery page."
                              },
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:VideoGallery",
                                 "name": "VideoGallery",
                                 "rdfs:subClassOf": "schema:MediaGallery",
                                 "description": "Web page type: Video gallery page."
                              }
                           ]
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ContactPage",
                     "name": "ContactPage",
                     "rdfs:subClassOf": "schema:WebPage",
                     "description": "Web page type: Contact page."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:FAQPage",
                     "name": "FAQPage",
                     "rdfs:subClassOf": "schema:WebPage",
                     "description": "A FAQPage is a WebPage presenting one or more \"Frequently asked questions\" (see also QAPage)."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ItemPage",
                     "name": "ItemPage",
                     "rdfs:subClassOf": "schema:WebPage",
                     "description": "A page devoted to a single item, such as a particular product or hotel."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MedicalWebPage",
                     "name": "MedicalWebPage",
                     "rdfs:subClassOf": "schema:WebPage",
                     "description": "A web page that provides medical information."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ProfilePage",
                     "name": "ProfilePage",
                     "rdfs:subClassOf": "schema:WebPage",
                     "description": "Web page type: Profile page."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:QAPage",
                     "name": "QAPage",
                     "rdfs:subClassOf": "schema:WebPage",
                     "description": "A QAPage is a WebPage focussed on a specific Question and its Answer(s), e.g. in a question answering site or documenting Frequently Asked Questions (FAQs)."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:RealEstateListing",
                     "name": "RealEstateListing",
                     "rdfs:subClassOf": "schema:WebPage",
                     "description": "A RealEstateListing is a listing that describes one or more real-estate Offers (whose businessFunction is typically to lease out, or to sell).\n  The RealEstateListing type itself represents the overall listing, as manifested in some WebPage.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:SearchResultsPage",
                     "name": "SearchResultsPage",
                     "rdfs:subClassOf": "schema:WebPage",
                     "description": "Web page type: Search results page."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:WebPageElement",
               "name": "WebPageElement",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A web page element, like a table or an image.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:SiteNavigationElement",
                     "name": "SiteNavigationElement",
                     "rdfs:subClassOf": "schema:WebPageElement",
                     "description": "A navigation element of the page."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Table",
                     "name": "Table",
                     "rdfs:subClassOf": "schema:WebPageElement",
                     "description": "A table on a Web page."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:WPAdBlock",
                     "name": "WPAdBlock",
                     "rdfs:subClassOf": "schema:WebPageElement",
                     "description": "An advertising section of the page."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:WPFooter",
                     "name": "WPFooter",
                     "rdfs:subClassOf": "schema:WebPageElement",
                     "description": "The footer section of the page."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:WPHeader",
                     "name": "WPHeader",
                     "rdfs:subClassOf": "schema:WebPageElement",
                     "description": "The header section of the page."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:WPSideBar",
                     "name": "WPSideBar",
                     "rdfs:subClassOf": "schema:WebPageElement",
                     "description": "A sidebar section of the page."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:WebSite",
               "name": "WebSite",
               "rdfs:subClassOf": "schema:CreativeWork",
               "description": "A WebSite is a set of related web pages and other items typically served from a single web domain and accessible via URLs."
            }
         ]
      },
      {
         "@type": "rdfs:Class",
         "@id": "schema:Event",
         "name": "Event",
         "rdfs:subClassOf": "schema:Thing",
         "description": "An event happening at a certain time and location, such as a concert, lecture, or festival. Ticketing information may be added via the offers property. Repeated events may be structured as separate Event objects.",
         "children": [
            {
               "@type": "rdfs:Class",
               "@id": "schema:BusinessEvent",
               "name": "BusinessEvent",
               "rdfs:subClassOf": "schema:Event",
               "description": "Event type: Business event."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ChildrensEvent",
               "name": "ChildrensEvent",
               "rdfs:subClassOf": "schema:Event",
               "description": "Event type: Children's event."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ComedyEvent",
               "name": "ComedyEvent",
               "rdfs:subClassOf": "schema:Event",
               "description": "Event type: Comedy event."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:CourseInstance",
               "name": "CourseInstance",
               "rdfs:subClassOf": "schema:Event",
               "description": "An instance of a Course which is distinct from other instances because it is offered at a different time or location or through different media or modes of study or to a specific section of students."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:DanceEvent",
               "name": "DanceEvent",
               "rdfs:subClassOf": "schema:Event",
               "description": "Event type: A social dance."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:DeliveryEvent",
               "name": "DeliveryEvent",
               "rdfs:subClassOf": "schema:Event",
               "description": "An event involving the delivery of an item."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:EducationEvent",
               "name": "EducationEvent",
               "rdfs:subClassOf": "schema:Event",
               "description": "Event type: Education event."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:EventSeries",
               "name": "EventSeries",
               "rdfs:subClassOf": [
                  "schema:Event",
                  "schema:Series"
               ],
               "description": "A series of Events. Included events can relate with the series using the superEvent property.\n\nAn EventSeries is a collection of events that share some unifying characteristic. For example, \"The Olympic Games\" is a series, which\nis repeated regularly. The \"2012 London Olympics\" can be presented both as an Event in the series \"Olympic Games\", and as an\nEventSeries that included a number of sporting competitions as Events...",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ExhibitionEvent",
               "name": "ExhibitionEvent",
               "rdfs:subClassOf": "schema:Event",
               "description": "Event type: Exhibition event, e.g. at a museum, library, archive, tradeshow, ..."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Festival",
               "name": "Festival",
               "rdfs:subClassOf": "schema:Event",
               "description": "Event type: Festival."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:FoodEvent",
               "name": "FoodEvent",
               "rdfs:subClassOf": "schema:Event",
               "description": "Event type: Food event."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Hackathon",
               "name": "Hackathon",
               "rdfs:subClassOf": "schema:Event",
               "description": "A hackathon event.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:LiteraryEvent",
               "name": "LiteraryEvent",
               "rdfs:subClassOf": "schema:Event",
               "description": "Event type: Literary event."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MusicEvent",
               "name": "MusicEvent",
               "rdfs:subClassOf": "schema:Event",
               "description": "Event type: Music event."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:PublicationEvent",
               "name": "PublicationEvent",
               "rdfs:subClassOf": "schema:Event",
               "description": "A PublicationEvent corresponds indifferently to the event of publication for a CreativeWork of any type e.g. a broadcast event, an on-demand event, a book/journal publication via a variety of delivery media.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BroadcastEvent",
                     "name": "BroadcastEvent",
                     "rdfs:subClassOf": "schema:PublicationEvent",
                     "description": "An over the air or online broadcast event."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:OnDemandEvent",
                     "name": "OnDemandEvent",
                     "rdfs:subClassOf": "schema:PublicationEvent",
                     "description": "A publication event e.g. catch-up TV or radio podcast, during which a program is available on-demand."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:SaleEvent",
               "name": "SaleEvent",
               "rdfs:subClassOf": "schema:Event",
               "description": "Event type: Sales event."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ScreeningEvent",
               "name": "ScreeningEvent",
               "rdfs:subClassOf": "schema:Event",
               "description": "A screening of a movie or other video."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:SocialEvent",
               "name": "SocialEvent",
               "rdfs:subClassOf": "schema:Event",
               "description": "Event type: Social event."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:SportsEvent",
               "name": "SportsEvent",
               "rdfs:subClassOf": "schema:Event",
               "description": "Event type: Sports event."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:TheaterEvent",
               "name": "TheaterEvent",
               "rdfs:subClassOf": "schema:Event",
               "description": "Event type: Theater performance."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:UserInteraction",
               "name": "UserInteraction",
               "rdfs:subClassOf": "schema:Event",
               "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use Action-based vocabulary, alongside types such as Comment.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:UserBlocks",
                     "name": "UserBlocks",
                     "rdfs:subClassOf": "schema:UserInteraction",
                     "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use Action-based vocabulary, alongside types such as Comment."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:UserCheckins",
                     "name": "UserCheckins",
                     "rdfs:subClassOf": "schema:UserInteraction",
                     "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use Action-based vocabulary, alongside types such as Comment."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:UserComments",
                     "name": "UserComments",
                     "rdfs:subClassOf": "schema:UserInteraction",
                     "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use Action-based vocabulary, alongside types such as Comment."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:UserDownloads",
                     "name": "UserDownloads",
                     "rdfs:subClassOf": "schema:UserInteraction",
                     "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use Action-based vocabulary, alongside types such as Comment."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:UserLikes",
                     "name": "UserLikes",
                     "rdfs:subClassOf": "schema:UserInteraction",
                     "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use Action-based vocabulary, alongside types such as Comment."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:UserPageVisits",
                     "name": "UserPageVisits",
                     "rdfs:subClassOf": "schema:UserInteraction",
                     "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use Action-based vocabulary, alongside types such as Comment."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:UserPlays",
                     "name": "UserPlays",
                     "rdfs:subClassOf": "schema:UserInteraction",
                     "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use Action-based vocabulary, alongside types such as Comment."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:UserPlusOnes",
                     "name": "UserPlusOnes",
                     "rdfs:subClassOf": "schema:UserInteraction",
                     "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use Action-based vocabulary, alongside types such as Comment."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:UserTweets",
                     "name": "UserTweets",
                     "rdfs:subClassOf": "schema:UserInteraction",
                     "description": "UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use Action-based vocabulary, alongside types such as Comment."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:VisualArtsEvent",
               "name": "VisualArtsEvent",
               "rdfs:subClassOf": "schema:Event",
               "description": "Event type: Visual arts event."
            }
         ]
      },
      {
         "@type": "rdfs:Class",
         "@id": "schema:Intangible",
         "name": "Intangible",
         "rdfs:subClassOf": "schema:Thing",
         "description": "A utility class that serves as the umbrella for a number of 'intangible' things such as quantities, structured values, etc.",
         "children": [
            {
               "@type": "rdfs:Class",
               "@id": "schema:ActionAccessSpecification",
               "name": "ActionAccessSpecification",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A set of requirements that a must be fulfilled in order to perform an Action."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:AlignmentObject",
               "name": "AlignmentObject",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "An intangible item that describes an alignment between a learning resource and a node in an educational framework.\n\nShould not be used where the nature of the alignment can be described using a simple property, for example to express that a resource teaches or assesses a competency."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Audience",
               "name": "Audience",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "Intended audience for an item, i.e. the group for whom the item was created.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BusinessAudience",
                     "name": "BusinessAudience",
                     "rdfs:subClassOf": "schema:Audience",
                     "description": "A set of characteristics belonging to businesses, e.g. who compose an item's target audience."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:EducationalAudience",
                     "name": "EducationalAudience",
                     "rdfs:subClassOf": "schema:Audience",
                     "description": "An EducationalAudience."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MedicalAudience",
                     "name": "MedicalAudience",
                     "rdfs:subClassOf": [
                        "schema:Audience",
                        "schema:PeopleAudience"
                     ],
                     "description": "Target audiences for medical web pages.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Patient",
                           "name": "Patient",
                           "rdfs:subClassOf": [
                              "schema:MedicalAudience",
                              "schema:Person"
                           ],
                           "description": "A patient is any person recipient of health care services."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PeopleAudience",
                     "name": "PeopleAudience",
                     "rdfs:subClassOf": "schema:Audience",
                     "description": "A set of characteristics belonging to people, e.g. who compose an item's target audience.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MedicalAudience",
                           "name": "MedicalAudience",
                           "rdfs:subClassOf": [
                              "schema:Audience",
                              "schema:PeopleAudience"
                           ],
                           "description": "Target audiences for medical web pages."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ParentAudience",
                           "name": "ParentAudience",
                           "rdfs:subClassOf": "schema:PeopleAudience",
                           "description": "A set of characteristics describing parents, who can be interested in viewing some content."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Researcher",
                     "name": "Researcher",
                     "rdfs:subClassOf": "schema:Audience",
                     "description": "Researchers."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:BedDetails",
               "name": "BedDetails",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "An entity holding detailed information about the available bed types, e.g. the quantity of twin beds for a hotel room. For the single case of just one bed of a certain type, you can use bed directly with a text. See also BedType (under development)."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Brand",
               "name": "Brand",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A brand is a name used by an organization or business person for labeling a product, product group, or similar."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:BroadcastChannel",
               "name": "BroadcastChannel",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A unique instance of a BroadcastService on a CableOrSatelliteService lineup.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:RadioChannel",
                     "name": "RadioChannel",
                     "rdfs:subClassOf": "schema:BroadcastChannel",
                     "description": "A unique instance of a radio BroadcastService on a CableOrSatelliteService lineup.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AMRadioChannel",
                           "name": "AMRadioChannel",
                           "rdfs:subClassOf": "schema:RadioChannel",
                           "description": "A radio channel that uses AM."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:FMRadioChannel",
                           "name": "FMRadioChannel",
                           "rdfs:subClassOf": "schema:RadioChannel",
                           "description": "A radio channel that uses FM."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TelevisionChannel",
                     "name": "TelevisionChannel",
                     "rdfs:subClassOf": "schema:BroadcastChannel",
                     "description": "A unique instance of a television BroadcastService on a CableOrSatelliteService lineup."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:BroadcastFrequencySpecification",
               "name": "BroadcastFrequencySpecification",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "The frequency in MHz and the modulation used for a particular BroadcastService."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Class",
               "name": "Class",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A class, also often called a 'Type'; equivalent to rdfs:Class."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ComputerLanguage",
               "name": "ComputerLanguage",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "This type covers computer programming languages such as Scheme and Lisp, as well as other language-like computer representations. Natural languages are best represented with the Language type."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:DataFeedItem",
               "name": "DataFeedItem",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A single item within a larger data feed."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:DefinedTerm",
               "name": "DefinedTerm",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A word, name, acronym, phrase, etc. with a formal definition. Often used in the context of category or subject classification, glossaries or dictionaries, product or creative work types, etc. Use the name property for the term being defined, use termCode if the term has an alpha-numeric code allocated, use description to provide the definition of the term.",
               "pending": true,
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:CategoryCode",
                     "name": "CategoryCode",
                     "rdfs:subClassOf": "schema:DefinedTerm",
                     "description": "A Category Code.",
                     "pending": true,
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MedicalCode",
                           "name": "MedicalCode",
                           "rdfs:subClassOf": [
                              "schema:CategoryCode",
                              "schema:MedicalIntangible"
                           ],
                           "description": "A code for a medical entity."
                        }
                     ]
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Demand",
               "name": "Demand",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A demand entity represents the public, not necessarily binding, not necessarily exclusive, announcement by an organization or person to seek a certain type of goods or services. For describing demand using this type, the very same properties used for Offer apply."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:DigitalDocumentPermission",
               "name": "DigitalDocumentPermission",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A permission for a particular person or group to access a particular file."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:EducationalOccupationalProgram",
               "name": "EducationalOccupationalProgram",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A program offered by an institution which determines the learning progress to achieve an outcome, usually a credential like a degree or certificate. This would define a discrete set of opportunities (e.g., job, courses) that together constitute a program with a clear start, end, set of requirements, and transition to a new occupational opportunity (e...",
               "pending": true,
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:WorkBasedProgram",
                     "name": "WorkBasedProgram",
                     "rdfs:subClassOf": "schema:EducationalOccupationalProgram",
                     "description": "A program with both an educational and employment component. Typically based at a workplace and structured around work-based learning, with the aim of instilling competencies related to an occupation. WorkBasedProgram is used to distinguish programs such as apprenticeships from school, college or other classroom based educational programs.",
                     "pending": true
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:EnergyConsumptionDetails",
               "name": "EnergyConsumptionDetails",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "EnergyConsumptionDetails represents information related to the energy efficiency of a product that consumes energy. The information that can be provided is based on international regulations such as for example EU directive 2017/1369 for energy labeling and the Energy labeling rule under the Energy Policy and Conservation Act (EPCA) in the US.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:EntryPoint",
               "name": "EntryPoint",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "An entry point, within some Web-based protocol."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Enumeration",
               "name": "Enumeration",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "Lists or enumerations\u2014for example, a list of cuisines or music genres, etc.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BoardingPolicyType",
                     "name": "BoardingPolicyType",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "A type of boarding policy used by an airline."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BookFormatType",
                     "name": "BookFormatType",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "The publication format of the book."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BusinessEntityType",
                     "name": "BusinessEntityType",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "A business entity type is a conceptual entity representing the legal form, the size, the main line of business, the position in the value chain, or any combination thereof, of an organization or business person.\n\nCommonly used values:\n\n\nhttp://purl.org/goodrelations/v1#Business\nhttp://purl..."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BusinessFunction",
                     "name": "BusinessFunction",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "The business function specifies the type of activity or access (i.e., the bundle of rights) offered by the organization or business person through the offer. Typical are sell, rental or lease, maintenance or repair, manufacture / produce, recycle / dispose, engineering / construction, or installation..."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:CarUsageType",
                     "name": "CarUsageType",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "A value indicating a special usage of a car, e.g. commercial rental, driving school, or as a taxi."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ContactPointOption",
                     "name": "ContactPointOption",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Enumerated options related to a ContactPoint."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DayOfWeek",
                     "name": "DayOfWeek",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "The day of the week, e.g. used to specify to which day the opening hours of an OpeningHoursSpecification refer.\n\nOriginally, URLs from GoodRelations were used (for Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday plus a special entry for PublicHolidays); these have now been integrated directly into schema..."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DeliveryMethod",
                     "name": "DeliveryMethod",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "A delivery method is a standardized procedure for transferring the product or service to the destination of fulfillment chosen by the customer. Delivery methods are characterized by the means of transportation used, and by the organization or group that is the contracting party for the sending organization or person..."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DigitalDocumentPermissionType",
                     "name": "DigitalDocumentPermissionType",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "A type of permission which can be granted for accessing a digital document."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:EnergyEfficiencyEnumeration",
                     "name": "EnergyEfficiencyEnumeration",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Enumerates energy efficiency levels (also known as \"classes\" or \"ratings\") and certifications that are part of several international energy efficiency standards.",
                     "pending": true,
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:EUEnergyEfficiencyEnumeration",
                           "name": "EUEnergyEfficiencyEnumeration",
                           "rdfs:subClassOf": "schema:EnergyEfficiencyEnumeration",
                           "description": "Enumerates the EU energy efficiency classes A-G as well as A+, A++, and A+++ as defined in EU directive 2017/1369.",
                           "pending": true
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:EnergyStarEnergyEfficiencyEnumeration",
                           "name": "EnergyStarEnergyEfficiencyEnumeration",
                           "rdfs:subClassOf": "schema:EnergyEfficiencyEnumeration",
                           "description": "Used to indicate whether a product is EnergyStar certified.",
                           "pending": true
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:EventAttendanceModeEnumeration",
                     "name": "EventAttendanceModeEnumeration",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "An EventAttendanceModeEnumeration value is one of potentially several modes of organising an event, relating to whether it is online or offline.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:GamePlayMode",
                     "name": "GamePlayMode",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Indicates whether this game is multi-player, co-op or single-player."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:GenderType",
                     "name": "GenderType",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "An enumeration of genders."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:GovernmentBenefitsType",
                     "name": "GovernmentBenefitsType",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "GovernmentBenefitsType enumerates several kinds of government benefits to support the COVID-19 situation. Note that this structure may not capture all benefits offered.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:HealthAspectEnumeration",
                     "name": "HealthAspectEnumeration",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "HealthAspectEnumeration enumerates several aspects of health content online, each of which might be described using hasHealthAspect and HealthTopicContent.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ItemAvailability",
                     "name": "ItemAvailability",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "A list of possible product availability options."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ItemListOrderType",
                     "name": "ItemListOrderType",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Enumerated for values for itemListOrder for indicating how an ordered ItemList is organized."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:LegalValueLevel",
                     "name": "LegalValueLevel",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "A list of possible levels for the legal validity of a legislation.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MapCategoryType",
                     "name": "MapCategoryType",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "An enumeration of several kinds of Map."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MeasurementTypeEnumeration",
                     "name": "MeasurementTypeEnumeration",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Enumeration of common measurement types (or dimensions), for example \"chest\" for a person, \"inseam\" for pants, \"gauge\" for screws, or \"wheel\" for bicycles.",
                     "pending": true,
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:BodyMeasurementTypeEnumeration",
                           "name": "BodyMeasurementTypeEnumeration",
                           "rdfs:subClassOf": "schema:MeasurementTypeEnumeration",
                           "description": "Enumerates types (or dimensions) of a person's body measurements, for example for fitting of clothes.",
                           "pending": true
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:WearableMeasurementTypeEnumeration",
                           "name": "WearableMeasurementTypeEnumeration",
                           "rdfs:subClassOf": "schema:MeasurementTypeEnumeration",
                           "description": "Enumerates common types of measurement for wearables products.",
                           "pending": true
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MediaManipulationRatingEnumeration",
                     "name": "MediaManipulationRatingEnumeration",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Codes for use with the mediaAuthenticityCategory property, indicating the authenticity of a media object (in the context of how it was published or shared). In general these codes are not mutually exclusive, although some combinations (such as 'original' versus 'transformed', 'edited' and 'staged') would be contradictory if applied in the same MediaReview...",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MedicalEnumeration",
                     "name": "MedicalEnumeration",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Enumerations related to health and the practice of medicine: A concept that is used to attribute a quality to another concept, as a qualifier, a collection of items or a listing of all of the elements of a set in medicine practice.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:DrugCostCategory",
                           "name": "DrugCostCategory",
                           "rdfs:subClassOf": "schema:MedicalEnumeration",
                           "description": "Enumerated categories of medical drug costs."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:DrugPregnancyCategory",
                           "name": "DrugPregnancyCategory",
                           "rdfs:subClassOf": "schema:MedicalEnumeration",
                           "description": "Categories that represent an assessment of the risk of fetal injury due to a drug or pharmaceutical used as directed by the mother during pregnancy."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:DrugPrescriptionStatus",
                           "name": "DrugPrescriptionStatus",
                           "rdfs:subClassOf": "schema:MedicalEnumeration",
                           "description": "Indicates whether this drug is available by prescription or over-the-counter."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:InfectiousAgentClass",
                           "name": "InfectiousAgentClass",
                           "rdfs:subClassOf": "schema:MedicalEnumeration",
                           "description": "Classes of agents or pathogens that transmit infectious diseases. Enumerated type."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MedicalAudienceType",
                           "name": "MedicalAudienceType",
                           "rdfs:subClassOf": "schema:MedicalEnumeration",
                           "description": "Target audiences types for medical web pages. Enumerated type."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MedicalDevicePurpose",
                           "name": "MedicalDevicePurpose",
                           "rdfs:subClassOf": "schema:MedicalEnumeration",
                           "description": "Categories of medical devices, organized by the purpose or intended use of the device."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MedicalEvidenceLevel",
                           "name": "MedicalEvidenceLevel",
                           "rdfs:subClassOf": "schema:MedicalEnumeration",
                           "description": "Level of evidence for a medical guideline. Enumerated type."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MedicalImagingTechnique",
                           "name": "MedicalImagingTechnique",
                           "rdfs:subClassOf": "schema:MedicalEnumeration",
                           "description": "Any medical imaging modality typically used for diagnostic purposes. Enumerated type."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MedicalObservationalStudyDesign",
                           "name": "MedicalObservationalStudyDesign",
                           "rdfs:subClassOf": "schema:MedicalEnumeration",
                           "description": "Design models for observational medical studies. Enumerated type."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MedicalProcedureType",
                           "name": "MedicalProcedureType",
                           "rdfs:subClassOf": "schema:MedicalEnumeration",
                           "description": "An enumeration that describes different types of medical procedures."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MedicalSpecialty",
                           "name": "MedicalSpecialty",
                           "rdfs:subClassOf": [
                              "schema:MedicalEnumeration",
                              "schema:Specialty"
                           ],
                           "description": "Any specific branch of medical science or practice. Medical specialities include clinical specialties that pertain to particular organ systems and their respective disease states, as well as allied health specialties. Enumerated type."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MedicalStudyStatus",
                           "name": "MedicalStudyStatus",
                           "rdfs:subClassOf": "schema:MedicalEnumeration",
                           "description": "The status of a medical study. Enumerated type."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MedicalTrialDesign",
                           "name": "MedicalTrialDesign",
                           "rdfs:subClassOf": "schema:MedicalEnumeration",
                           "description": "Design models for medical trials. Enumerated type."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MedicineSystem",
                           "name": "MedicineSystem",
                           "rdfs:subClassOf": "schema:MedicalEnumeration",
                           "description": "Systems of medical practice."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:PhysicalExam",
                           "name": "PhysicalExam",
                           "rdfs:subClassOf": [
                              "schema:MedicalEnumeration",
                              "schema:MedicalProcedure"
                           ],
                           "description": "A type of physical examination of a patient performed by a physician."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MerchantReturnEnumeration",
                     "name": "MerchantReturnEnumeration",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Enumerates several kinds of product return policies.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MusicAlbumProductionType",
                     "name": "MusicAlbumProductionType",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Classification of the album by it's type of content: soundtrack, live album, studio album, etc."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MusicAlbumReleaseType",
                     "name": "MusicAlbumReleaseType",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "The kind of release which this album is: single, EP or album."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MusicReleaseFormatType",
                     "name": "MusicReleaseFormatType",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Format of this release (the type of recording media used, ie. compact disc, digital media, LP, etc.)."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:NonprofitType",
                     "name": "NonprofitType",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "NonprofitType enumerates several kinds of official non-profit types of which a non-profit organization can be.",
                     "pending": true,
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:NLNonprofitType",
                           "name": "NLNonprofitType",
                           "rdfs:subClassOf": "schema:NonprofitType",
                           "description": "NLNonprofitType: Non-profit organization type originating from the Netherlands.",
                           "pending": true
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:UKNonprofitType",
                           "name": "UKNonprofitType",
                           "rdfs:subClassOf": "schema:NonprofitType",
                           "description": "UKNonprofitType: Non-profit organization type originating from the United Kingdom.",
                           "pending": true
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:USNonprofitType",
                           "name": "USNonprofitType",
                           "rdfs:subClassOf": "schema:NonprofitType",
                           "description": "USNonprofitType: Non-profit organization type originating from the United States.",
                           "pending": true
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:OfferItemCondition",
                     "name": "OfferItemCondition",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "A list of possible conditions for the item."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PaymentMethod",
                     "name": "PaymentMethod",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "A payment method is a standardized procedure for transferring the monetary amount for a purchase. Payment methods are characterized by the legal and technical structures used, and by the organization or group carrying out the transaction.\n\nCommonly used values:\n\n\nhttp://purl...",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:PaymentCard",
                           "name": "PaymentCard",
                           "rdfs:subClassOf": [
                              "schema:FinancialProduct",
                              "schema:PaymentMethod"
                           ],
                           "description": "A payment method using a credit, debit, store or other card to associate the payment with an account.",
                           "children": [
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:CreditCard",
                                 "name": "CreditCard",
                                 "rdfs:subClassOf": [
                                    "schema:LoanOrCredit",
                                    "schema:PaymentCard"
                                 ],
                                 "description": "A card payment method of a particular brand or name.  Used to mark up a particular payment method and/or the financial product/service that supplies the card account.\n\nCommonly used values:\n\n\nhttp://purl.org/goodrelations/v1#AmericanExpress\nhttp://purl..."
                              }
                           ]
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PhysicalActivityCategory",
                     "name": "PhysicalActivityCategory",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Categories of physical activity, organized by physiologic classification."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PriceComponentTypeEnumeration",
                     "name": "PriceComponentTypeEnumeration",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Enumerates different price components that together make up the total price for an offered product.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PriceTypeEnumeration",
                     "name": "PriceTypeEnumeration",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Enumerates different price types, for example list price, invoice price, and sale price.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ProductReturnEnumeration",
                     "name": "ProductReturnEnumeration",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "ProductReturnEnumeration enumerates several kinds of product return policy. Note that this structure may not capture all aspects of the policy.",
                     "attic": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:QualitativeValue",
                     "name": "QualitativeValue",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "A predefined value for a product characteristic, e.g. the power cord plug type 'US' or the garment sizes 'S', 'M', 'L', and 'XL'.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:BedType",
                           "name": "BedType",
                           "rdfs:subClassOf": "schema:QualitativeValue",
                           "description": "A type of bed. This is used for indicating the bed or beds available in an accommodation."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:DriveWheelConfigurationValue",
                           "name": "DriveWheelConfigurationValue",
                           "rdfs:subClassOf": "schema:QualitativeValue",
                           "description": "A value indicating which roadwheels will receive torque."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:SizeSpecification",
                           "name": "SizeSpecification",
                           "rdfs:subClassOf": "schema:QualitativeValue",
                           "description": "Size related properties of a product, typically a size code (name) and optionally a sizeSystem, sizeGroup, and product measurements (hasMeasurement). In addition, the intended audience can be defined through suggestedAge, suggestedGender, and suggested body measurements (suggestedMeasurement).",
                           "pending": true
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:SteeringPositionValue",
                           "name": "SteeringPositionValue",
                           "rdfs:subClassOf": "schema:QualitativeValue",
                           "description": "A value indicating a steering position."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:RefundTypeEnumeration",
                     "name": "RefundTypeEnumeration",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Enumerates several kinds of product return refund types.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:RestrictedDiet",
                     "name": "RestrictedDiet",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "A diet restricted to certain foods or preparations for cultural, religious, health or lifestyle reasons."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ReturnFeesEnumeration",
                     "name": "ReturnFeesEnumeration",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Enumerates several kinds of policies for product return fees.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ReturnLabelSourceEnumeration",
                     "name": "ReturnLabelSourceEnumeration",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Enumerates several types of return labels for product returns.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ReturnMethodEnumeration",
                     "name": "ReturnMethodEnumeration",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Enumerates several types of product return methods.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:RsvpResponseType",
                     "name": "RsvpResponseType",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "RsvpResponseType is an enumeration type whose instances represent responding to an RSVP request."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:SizeGroupEnumeration",
                     "name": "SizeGroupEnumeration",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Enumerates common size groups for various product categories.",
                     "pending": true,
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:WearableSizeGroupEnumeration",
                           "name": "WearableSizeGroupEnumeration",
                           "rdfs:subClassOf": "schema:SizeGroupEnumeration",
                           "description": "Enumerates common size groups (also known as \"size types\") for wearable products.",
                           "pending": true
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:SizeSystemEnumeration",
                     "name": "SizeSystemEnumeration",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Enumerates common size systems for different categories of products, for example \"EN-13402\" or \"UK\" for wearables or \"Imperial\" for screws.",
                     "pending": true,
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:WearableSizeSystemEnumeration",
                           "name": "WearableSizeSystemEnumeration",
                           "rdfs:subClassOf": "schema:SizeSystemEnumeration",
                           "description": "Enumerates common size systems specific for wearable products",
                           "pending": true
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Specialty",
                     "name": "Specialty",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Any branch of a field in which people typically develop specific expertise, usually after significant study, time, and effort.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MedicalSpecialty",
                           "name": "MedicalSpecialty",
                           "rdfs:subClassOf": [
                              "schema:MedicalEnumeration",
                              "schema:Specialty"
                           ],
                           "description": "Any specific branch of medical science or practice. Medical specialities include clinical specialties that pertain to particular organ systems and their respective disease states, as well as allied health specialties. Enumerated type."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:StatusEnumeration",
                     "name": "StatusEnumeration",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "Lists or enumerations dealing with status types.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ActionStatusType",
                           "name": "ActionStatusType",
                           "rdfs:subClassOf": "schema:StatusEnumeration",
                           "description": "The status of an Action."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:EventStatusType",
                           "name": "EventStatusType",
                           "rdfs:subClassOf": "schema:StatusEnumeration",
                           "description": "EventStatusType is an enumeration type whose instances represent several states that an Event may be in."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:GameServerStatus",
                           "name": "GameServerStatus",
                           "rdfs:subClassOf": "schema:StatusEnumeration",
                           "description": "Status of a game server."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:LegalForceStatus",
                           "name": "LegalForceStatus",
                           "rdfs:subClassOf": "schema:StatusEnumeration",
                           "description": "A list of possible statuses for the legal force of a legislation.",
                           "pending": true
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:OrderStatus",
                           "name": "OrderStatus",
                           "rdfs:subClassOf": "schema:StatusEnumeration",
                           "description": "Enumerated status values for Order."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:PaymentStatusType",
                           "name": "PaymentStatusType",
                           "rdfs:subClassOf": "schema:StatusEnumeration",
                           "description": "A specific payment status. For example, PaymentDue, PaymentComplete, etc."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ReservationStatusType",
                           "name": "ReservationStatusType",
                           "rdfs:subClassOf": "schema:StatusEnumeration",
                           "description": "Enumerated status values for Reservation."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:WarrantyScope",
                     "name": "WarrantyScope",
                     "rdfs:subClassOf": "schema:Enumeration",
                     "description": "A range of of services that will be provided to a customer free of charge in case of a defect or malfunction of a product.\n\nCommonly used values:\n\n\nhttp://purl.org/goodrelations/v1#Labor-BringIn\nhttp://purl.org/goodrelations/v1#PartsAndLabor-BringIn\nhttp://purl..."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:FloorPlan",
               "name": "FloorPlan",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A FloorPlan is an explicit representation of a collection of similar accommodations, allowing the provision of common information (room counts, sizes, layout diagrams) and offers for rental or sale. In typical use, some ApartmentComplex has an accommodationFloorPlan which is a FloorPlan...",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:GameServer",
               "name": "GameServer",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "Server that provides game interaction in a multiplayer game."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:GeospatialGeometry",
               "name": "GeospatialGeometry",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "(Eventually to be defined as) a supertype of GeoShape designed to accommodate definitions from Geo-Spatial best practices.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Grant",
               "name": "Grant",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A grant, typically financial or otherwise quantifiable, of resources. Typically a funder sponsors some MonetaryAmount to an Organization or Person,\n    sometimes not necessarily via a dedicated or long-lived Project, resulting in one or more outputs, or fundedItems...",
               "pending": true,
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MonetaryGrant",
                     "name": "MonetaryGrant",
                     "rdfs:subClassOf": "schema:Grant",
                     "description": "A monetary grant.",
                     "pending": true
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:HealthInsurancePlan",
               "name": "HealthInsurancePlan",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A US-style health insurance plan, including PPOs, EPOs, and HMOs.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:HealthPlanCostSharingSpecification",
               "name": "HealthPlanCostSharingSpecification",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A description of costs to the patient under a given network or formulary.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:HealthPlanFormulary",
               "name": "HealthPlanFormulary",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "For a given health insurance plan, the specification for costs and coverage of prescription drugs.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:HealthPlanNetwork",
               "name": "HealthPlanNetwork",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A US-style health insurance plan network.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Invoice",
               "name": "Invoice",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A statement of the money due for goods or services; a bill."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ItemList",
               "name": "ItemList",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A list of items of any sort&#x2014;for example, Top 10 Movies About Weathermen, or Top 100 Party Songs. Not to be confused with HTML lists, which are often used only for formatting.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BreadcrumbList",
                     "name": "BreadcrumbList",
                     "rdfs:subClassOf": "schema:ItemList",
                     "description": "A BreadcrumbList is an ItemList consisting of a chain of linked Web pages, typically described using at least their URL and their name, and typically ending with the current page.\n\nThe position property is used to reconstruct the order of the items in a BreadcrumbList The convention is that a breadcrumb list has an itemListOrder of ItemListOrderAscending (lower values listed first), and that the first items in this list correspond to the \"top\" or beginning of the breadcrumb trail, e..."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:HowToSection",
                     "name": "HowToSection",
                     "rdfs:subClassOf": [
                        "schema:CreativeWork",
                        "schema:ItemList",
                        "schema:ListItem"
                     ],
                     "description": "A sub-grouping of steps in the instructions for how to achieve a result (e.g. steps for making a pie crust within a pie recipe)."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:HowToStep",
                     "name": "HowToStep",
                     "rdfs:subClassOf": [
                        "schema:CreativeWork",
                        "schema:ItemList",
                        "schema:ListItem"
                     ],
                     "description": "A step in the instructions for how to achieve a result. It is an ordered list with HowToDirection and/or HowToTip items."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:OfferCatalog",
                     "name": "OfferCatalog",
                     "rdfs:subClassOf": "schema:ItemList",
                     "description": "An OfferCatalog is an ItemList that contains related Offers and/or further OfferCatalogs that are offeredBy the same provider."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:JobPosting",
               "name": "JobPosting",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A listing that describes a job opening in a certain organization."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Language",
               "name": "Language",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "Natural languages such as Spanish, Tamil, Hindi, English, etc. Formal language code tags expressed in BCP 47 can be used via the alternateName property. The Language type previously also covered programming languages such as Scheme and Lisp, which are now best represented using ComputerLanguage."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ListItem",
               "name": "ListItem",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "An list item, e.g. a step in a checklist or how-to description.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:HowToDirection",
                     "name": "HowToDirection",
                     "rdfs:subClassOf": [
                        "schema:CreativeWork",
                        "schema:ListItem"
                     ],
                     "description": "A direction indicating a single action to do in the instructions for how to achieve a result."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:HowToItem",
                     "name": "HowToItem",
                     "rdfs:subClassOf": "schema:ListItem",
                     "description": "An item used as either a tool or supply when performing the instructions for how to to achieve a result.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:HowToSupply",
                           "name": "HowToSupply",
                           "rdfs:subClassOf": "schema:HowToItem",
                           "description": "A supply consumed when performing the instructions for how to achieve a result."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:HowToTool",
                           "name": "HowToTool",
                           "rdfs:subClassOf": "schema:HowToItem",
                           "description": "A tool used (but not consumed) when performing instructions for how to achieve a result."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:HowToSection",
                     "name": "HowToSection",
                     "rdfs:subClassOf": [
                        "schema:CreativeWork",
                        "schema:ItemList",
                        "schema:ListItem"
                     ],
                     "description": "A sub-grouping of steps in the instructions for how to achieve a result (e.g. steps for making a pie crust within a pie recipe)."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:HowToStep",
                     "name": "HowToStep",
                     "rdfs:subClassOf": [
                        "schema:CreativeWork",
                        "schema:ItemList",
                        "schema:ListItem"
                     ],
                     "description": "A step in the instructions for how to achieve a result. It is an ordered list with HowToDirection and/or HowToTip items."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:HowToTip",
                     "name": "HowToTip",
                     "rdfs:subClassOf": [
                        "schema:CreativeWork",
                        "schema:ListItem"
                     ],
                     "description": "An explanation in the instructions for how to achieve a result. It provides supplementary information about a technique, supply, author's preference, etc. It can explain what could be done, or what should not be done, but doesn't specify what should be done (see HowToDirection)."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MediaSubscription",
               "name": "MediaSubscription",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A subscription which allows a user to access media including audio, video, books, etc."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MenuItem",
               "name": "MenuItem",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A food or drink item listed in a menu or menu section."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MerchantReturnPolicy",
               "name": "MerchantReturnPolicy",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A MerchantReturnPolicy provides information about product return policies associated with an Organization, Product, or Offer.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MerchantReturnPolicySeasonalOverride",
               "name": "MerchantReturnPolicySeasonalOverride",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A seasonal override of a return policy, for example used for holidays.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Observation",
               "name": "Observation",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "Instances of the class Observation are used to specify observations about an entity (which may or may not be an instance of a StatisticalPopulation), at a particular time. The principal properties of an Observation are observedNode, measuredProperty, measuredValue (or median, etc...",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Occupation",
               "name": "Occupation",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A profession, may involve prolonged training and/or a formal qualification."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:OccupationalExperienceRequirements",
               "name": "OccupationalExperienceRequirements",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "Indicates employment-related experience requirements, e.g. monthsOfExperience.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Offer",
               "name": "Offer",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "An offer to transfer some rights to an item or to provide a service \u2014 for example, an offer to sell tickets to an event, to rent the DVD of a movie, to stream a TV show over the internet, to repair a motorcycle, or to loan a book.\n\nNote: As the businessFunction property, which identifies the form of offer (e...",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:AggregateOffer",
                     "name": "AggregateOffer",
                     "rdfs:subClassOf": "schema:Offer",
                     "description": "When a single product is associated with multiple offers (for example, the same pair of shoes is offered by different merchants), then AggregateOffer can be used.\n\nNote: AggregateOffers are normally expected to associate multiple offers that all share the same defined businessFunction value, or default to http://purl..."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:OfferForLease",
                     "name": "OfferForLease",
                     "rdfs:subClassOf": "schema:Offer",
                     "description": "An OfferForLease in Schema.org represents an Offer to lease out something, i.e. an Offer whose\n  businessFunction is lease out. See Good Relations for\n  background on the underlying concepts.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:OfferForPurchase",
                     "name": "OfferForPurchase",
                     "rdfs:subClassOf": "schema:Offer",
                     "description": "An OfferForPurchase in Schema.org represents an Offer to sell something, i.e. an Offer whose\n  businessFunction is sell. See Good Relations for\n  background on the underlying concepts.",
                     "pending": true
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Order",
               "name": "Order",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "An order is a confirmation of a transaction (a receipt), which can contain multiple line items, each represented by an Offer that has been accepted by the customer."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:OrderItem",
               "name": "OrderItem",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "An order item is a line of an order. It includes the quantity and shipping details of a bought offer."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ParcelDelivery",
               "name": "ParcelDelivery",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "The delivery of a parcel either via the postal service or a commercial service."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Permit",
               "name": "Permit",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A permit issued by an organization, e.g. a parking pass.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:GovernmentPermit",
                     "name": "GovernmentPermit",
                     "rdfs:subClassOf": "schema:Permit",
                     "description": "A permit issued by a government agency."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ProductReturnPolicy",
               "name": "ProductReturnPolicy",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A ProductReturnPolicy provides information about product return policies associated with an Organization or Product.",
               "attic": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ProgramMembership",
               "name": "ProgramMembership",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "Used to describe membership in a loyalty programs (e.g. \"StarAliance\"), traveler clubs (e.g. \"AAA\"), purchase clubs (\"Safeway Club\"), etc."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Property",
               "name": "Property",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A property, used to indicate attributes and relationships of some Thing; equivalent to rdf:Property."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:PropertyValueSpecification",
               "name": "PropertyValueSpecification",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A Property value specification."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Quantity",
               "name": "Quantity",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "Quantities such as distance, time, mass, weight, etc. Particular instances of say Mass are entities like '3 Kg' or '4 milligrams'.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Distance",
                     "name": "Distance",
                     "rdfs:subClassOf": "schema:Quantity",
                     "description": "Properties that take Distances as values are of the form '&lt;Number&gt; &lt;Length unit of measure&gt;'. E.g., '7 ft'."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Duration",
                     "name": "Duration",
                     "rdfs:subClassOf": "schema:Quantity",
                     "description": "Quantity: Duration (use ISO 8601 duration format)."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Energy",
                     "name": "Energy",
                     "rdfs:subClassOf": "schema:Quantity",
                     "description": "Properties that take Energy as values are of the form '&lt;Number&gt; &lt;Energy unit of measure&gt;'."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Mass",
                     "name": "Mass",
                     "rdfs:subClassOf": "schema:Quantity",
                     "description": "Properties that take Mass as values are of the form '&lt;Number&gt; &lt;Mass unit of measure&gt;'. E.g., '7 kg'."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Rating",
               "name": "Rating",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A rating is an evaluation on a numeric scale, such as 1 to 5 stars.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:AggregateRating",
                     "name": "AggregateRating",
                     "rdfs:subClassOf": "schema:Rating",
                     "description": "The average rating based on multiple ratings or reviews.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:EmployerAggregateRating",
                           "name": "EmployerAggregateRating",
                           "rdfs:subClassOf": "schema:AggregateRating",
                           "description": "An aggregate rating of an Organization related to its role as an employer."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:EndorsementRating",
                     "name": "EndorsementRating",
                     "rdfs:subClassOf": "schema:Rating",
                     "description": "An EndorsementRating is a rating that expresses some level of endorsement, for example inclusion in a \"critic's pick\" blog, a\n\"Like\" or \"+1\" on a social network. It can be considered the result of an EndorseAction in which the object of the action is rated positively by\nsome agent..."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Reservation",
               "name": "Reservation",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "Describes a reservation for travel, dining or an event. Some reservations require tickets. \n\nNote: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations. For offers of tickets, restaurant reservations, flights, or rental cars, use Offer.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BoatReservation",
                     "name": "BoatReservation",
                     "rdfs:subClassOf": "schema:Reservation",
                     "description": "A reservation for boat travel.\n\nNote: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations. For offers of tickets, use Offer.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BusReservation",
                     "name": "BusReservation",
                     "rdfs:subClassOf": "schema:Reservation",
                     "description": "A reservation for bus travel. \n\nNote: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations. For offers of tickets, use Offer."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:EventReservation",
                     "name": "EventReservation",
                     "rdfs:subClassOf": "schema:Reservation",
                     "description": "A reservation for an event like a concert, sporting event, or lecture.\n\nNote: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations. For offers of tickets, use Offer."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:FlightReservation",
                     "name": "FlightReservation",
                     "rdfs:subClassOf": "schema:Reservation",
                     "description": "A reservation for air travel.\n\nNote: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations. For offers of tickets, use Offer."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:FoodEstablishmentReservation",
                     "name": "FoodEstablishmentReservation",
                     "rdfs:subClassOf": "schema:Reservation",
                     "description": "A reservation to dine at a food-related business.\n\nNote: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:LodgingReservation",
                     "name": "LodgingReservation",
                     "rdfs:subClassOf": "schema:Reservation",
                     "description": "A reservation for lodging at a hotel, motel, inn, etc.\n\nNote: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:RentalCarReservation",
                     "name": "RentalCarReservation",
                     "rdfs:subClassOf": "schema:Reservation",
                     "description": "A reservation for a rental car.\n\nNote: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ReservationPackage",
                     "name": "ReservationPackage",
                     "rdfs:subClassOf": "schema:Reservation",
                     "description": "A group of multiple reservations with common values for all sub-reservations."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TaxiReservation",
                     "name": "TaxiReservation",
                     "rdfs:subClassOf": "schema:Reservation",
                     "description": "A reservation for a taxi.\n\nNote: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations. For offers of tickets, use Offer."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TrainReservation",
                     "name": "TrainReservation",
                     "rdfs:subClassOf": "schema:Reservation",
                     "description": "A reservation for train travel.\n\nNote: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations. For offers of tickets, use Offer."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Role",
               "name": "Role",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "Represents additional information about a relationship or property. For example a Role can be used to say that a 'member' role linking some SportsTeam to a player occurred during a particular time period. Or that a Person's 'actor' role in a Movie was for some particular characterName...",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:LinkRole",
                     "name": "LinkRole",
                     "rdfs:subClassOf": "schema:Role",
                     "description": "A Role that represents a Web link e.g. as expressed via the 'url' property. Its linkRelationship property can indicate URL-based and plain textual link types e.g. those in IANA link registry or others such as 'amphtml'. This structure provides a placeholder where details from HTML's link element can be represented outside of HTML, e...",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:OrganizationRole",
                     "name": "OrganizationRole",
                     "rdfs:subClassOf": "schema:Role",
                     "description": "A subclass of Role used to describe roles within organizations.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:EmployeeRole",
                           "name": "EmployeeRole",
                           "rdfs:subClassOf": "schema:OrganizationRole",
                           "description": "A subclass of OrganizationRole used to describe employee relationships."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PerformanceRole",
                     "name": "PerformanceRole",
                     "rdfs:subClassOf": "schema:Role",
                     "description": "A PerformanceRole is a Role that some entity places with regard to a theatrical performance, e.g. in a Movie, TVSeries etc."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Schedule",
               "name": "Schedule",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A schedule defines a repeating time period used to describe a regularly occurring Event. At a minimum a schedule will specify repeatFrequency which describes the interval between occurences of the event. Additional information can be provided to specify the schedule more precisely...",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Seat",
               "name": "Seat",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "Used to describe a seat, such as a reserved seat in an event reservation."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Series",
               "name": "Series",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A Series in schema.org is a group of related items, typically but not necessarily of the same kind. See also CreativeWorkSeries, EventSeries.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:CreativeWorkSeries",
                     "name": "CreativeWorkSeries",
                     "rdfs:subClassOf": [
                        "schema:CreativeWork",
                        "schema:Series"
                     ],
                     "description": "A CreativeWorkSeries in schema.org is a group of related items, typically but not necessarily of the same kind. CreativeWorkSeries are usually organized into some order, often chronological. Unlike ItemList which is a general purpose data structure for lists of things, the emphasis with CreativeWorkSeries is on published materials (written e..."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:EventSeries",
                     "name": "EventSeries",
                     "rdfs:subClassOf": [
                        "schema:Event",
                        "schema:Series"
                     ],
                     "description": "A series of Events. Included events can relate with the series using the superEvent property.\n\nAn EventSeries is a collection of events that share some unifying characteristic. For example, \"The Olympic Games\" is a series, which\nis repeated regularly. The \"2012 London Olympics\" can be presented both as an Event in the series \"Olympic Games\", and as an\nEventSeries that included a number of sporting competitions as Events...",
                     "pending": true
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Service",
               "name": "Service",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A service provided by an organization, e.g. delivery service, print services, etc.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BroadcastService",
                     "name": "BroadcastService",
                     "rdfs:subClassOf": "schema:Service",
                     "description": "A delivery service through which content is provided via broadcast over the air or online.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:RadioBroadcastService",
                           "name": "RadioBroadcastService",
                           "rdfs:subClassOf": "schema:BroadcastService",
                           "description": "A delivery service through which radio content is provided via broadcast over the air or online.",
                           "pending": true
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:CableOrSatelliteService",
                     "name": "CableOrSatelliteService",
                     "rdfs:subClassOf": "schema:Service",
                     "description": "A service which provides access to media programming like TV or radio. Access may be via cable or satellite."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:FinancialProduct",
                     "name": "FinancialProduct",
                     "rdfs:subClassOf": "schema:Service",
                     "description": "A product provided to consumers and businesses by financial institutions such as banks, insurance companies, brokerage firms, consumer finance companies, and investment companies which comprise the financial services industry.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:BankAccount",
                           "name": "BankAccount",
                           "rdfs:subClassOf": "schema:FinancialProduct",
                           "description": "A product or service offered by a bank whereby one may deposit, withdraw or transfer money and in some cases be paid interest.",
                           "children": [
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:DepositAccount",
                                 "name": "DepositAccount",
                                 "rdfs:subClassOf": [
                                    "schema:BankAccount",
                                    "schema:InvestmentOrDeposit"
                                 ],
                                 "description": "A type of Bank Account with a main purpose of depositing funds to gain interest or other benefits."
                              }
                           ]
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:CurrencyConversionService",
                           "name": "CurrencyConversionService",
                           "rdfs:subClassOf": "schema:FinancialProduct",
                           "description": "A service to convert funds from one currency to another currency."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:InvestmentOrDeposit",
                           "name": "InvestmentOrDeposit",
                           "rdfs:subClassOf": "schema:FinancialProduct",
                           "description": "A type of financial product that typically requires the client to transfer funds to a financial service in return for potential beneficial financial return.",
                           "children": [
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:BrokerageAccount",
                                 "name": "BrokerageAccount",
                                 "rdfs:subClassOf": "schema:InvestmentOrDeposit",
                                 "description": "An account that allows an investor to deposit funds and place investment orders with a licensed broker or brokerage firm.",
                                 "pending": true
                              },
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:DepositAccount",
                                 "name": "DepositAccount",
                                 "rdfs:subClassOf": [
                                    "schema:BankAccount",
                                    "schema:InvestmentOrDeposit"
                                 ],
                                 "description": "A type of Bank Account with a main purpose of depositing funds to gain interest or other benefits."
                              },
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:InvestmentFund",
                                 "name": "InvestmentFund",
                                 "rdfs:subClassOf": "schema:InvestmentOrDeposit",
                                 "description": "A company or fund that gathers capital from a number of investors to create a pool of money that is then re-invested into stocks, bonds and other assets.",
                                 "pending": true
                              }
                           ]
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:LoanOrCredit",
                           "name": "LoanOrCredit",
                           "rdfs:subClassOf": "schema:FinancialProduct",
                           "description": "A financial product for the loaning of an amount of money, or line of credit, under agreed terms and charges.",
                           "children": [
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:CreditCard",
                                 "name": "CreditCard",
                                 "rdfs:subClassOf": [
                                    "schema:LoanOrCredit",
                                    "schema:PaymentCard"
                                 ],
                                 "description": "A card payment method of a particular brand or name.  Used to mark up a particular payment method and/or the financial product/service that supplies the card account.\n\nCommonly used values:\n\n\nhttp://purl.org/goodrelations/v1#AmericanExpress\nhttp://purl..."
                              },
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:MortgageLoan",
                                 "name": "MortgageLoan",
                                 "rdfs:subClassOf": "schema:LoanOrCredit",
                                 "description": "A loan in which property or real estate is used as collateral. (A loan securitized against some real estate).",
                                 "pending": true
                              }
                           ]
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:PaymentCard",
                           "name": "PaymentCard",
                           "rdfs:subClassOf": [
                              "schema:FinancialProduct",
                              "schema:PaymentMethod"
                           ],
                           "description": "A payment method using a credit, debit, store or other card to associate the payment with an account."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:PaymentService",
                           "name": "PaymentService",
                           "rdfs:subClassOf": "schema:FinancialProduct",
                           "description": "A Service to transfer funds from a person or organization to a beneficiary person or organization."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:FoodService",
                     "name": "FoodService",
                     "rdfs:subClassOf": "schema:Service",
                     "description": "A food service, like breakfast, lunch, or dinner."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:GovernmentService",
                     "name": "GovernmentService",
                     "rdfs:subClassOf": "schema:Service",
                     "description": "A service provided by a government organization, e.g. food stamps, veterans benefits, etc."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Taxi",
                     "name": "Taxi",
                     "rdfs:subClassOf": "schema:Service",
                     "description": "A taxi."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TaxiService",
                     "name": "TaxiService",
                     "rdfs:subClassOf": "schema:Service",
                     "description": "A service for a vehicle for hire with a driver for local travel. Fares are usually calculated based on distance traveled."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:WebAPI",
                     "name": "WebAPI",
                     "rdfs:subClassOf": "schema:Service",
                     "description": "An application programming interface accessible over Web/Internet technologies.",
                     "pending": true
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ServiceChannel",
               "name": "ServiceChannel",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A means for accessing a service, e.g. a government office location, web site, or phone number."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:SpeakableSpecification",
               "name": "SpeakableSpecification",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A SpeakableSpecification indicates (typically via xpath or cssSelector) sections of a document that are highlighted as particularly speakable. Instances of this type are expected to be used primarily as values of the speakable property."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:StatisticalPopulation",
               "name": "StatisticalPopulation",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A StatisticalPopulation is a set of instances of a certain given type that satisfy some set of constraints. The property populationType is used to specify the type. Any property that can be used on instances of that type can appear on the statistical population...",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:StructuredValue",
               "name": "StructuredValue",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "Structured values are used when the value of a property has a more complex structure than simply being a textual value or a reference to another thing.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:CDCPMDRecord",
                     "name": "CDCPMDRecord",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "A CDCPMDRecord is a data structure representing a record in a CDC tabular data format\n      used for hospital data reporting. See documentation for details, and the linked CDC materials for authoritative\n      definitions used as the source here.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ContactPoint",
                     "name": "ContactPoint",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "A contact point&#x2014;for example, a Customer Complaints department.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:PostalAddress",
                           "name": "PostalAddress",
                           "rdfs:subClassOf": "schema:ContactPoint",
                           "description": "The mailing address."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DatedMoneySpecification",
                     "name": "DatedMoneySpecification",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "A DatedMoneySpecification represents monetary values with optional start and end dates. For example, this could represent an employee's salary over a specific period of time. Note: This type has been superseded by MonetaryAmount use of that type is recommended"
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DefinedRegion",
                     "name": "DefinedRegion",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "A DefinedRegion is a geographic area defined by potentially arbitrary (rather than political, administrative or natural geographical) criteria. Properties are provided for defining a region by reference to sets of postal codes.\n\nExamples: a delivery destination when shopping...",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DeliveryTimeSettings",
                     "name": "DeliveryTimeSettings",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "A DeliveryTimeSettings represents re-usable pieces of shipping information, relating to timing. It is designed for publication on an URL that may be referenced via the shippingSettingsLink property of a OfferShippingDetails. Several occurrences can be published, distinguished (and identified/referenced) by their different values for transitTimeLabel.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:EngineSpecification",
                     "name": "EngineSpecification",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "Information about the engine of the vehicle. A vehicle can have multiple engines represented by multiple engine specification entities."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ExchangeRateSpecification",
                     "name": "ExchangeRateSpecification",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "A structured value representing exchange rate.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:GeoCoordinates",
                     "name": "GeoCoordinates",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "The geographic coordinates of a place or event."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:GeoShape",
                     "name": "GeoShape",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "The geographic shape of a place. A GeoShape can be described using several properties whose values are based on latitude/longitude pairs. Either whitespace or commas can be used to separate latitude and longitude; whitespace should be used when writing a list of several such points.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:GeoCircle",
                           "name": "GeoCircle",
                           "rdfs:subClassOf": "schema:GeoShape",
                           "description": "A GeoCircle is a GeoShape representing a circular geographic area. As it is a GeoShape\n          it provides the simple textual property 'circle', but also allows the combination of postalCode alongside geoRadius.\n          The center of the circle can be indicated via the 'geoMidpoint' property, or more approximately using 'address', 'postalCode'."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:InteractionCounter",
                     "name": "InteractionCounter",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "A summary of how users have interacted with this CreativeWork. In most cases, authors will use a subtype to specify the specific type of interaction."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MonetaryAmount",
                     "name": "MonetaryAmount",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "A monetary value or range. This type can be used to describe an amount of money such as $50 USD, or a range as in describing a bank account being suitable for a balance between \u00a31,000 and \u00a31,000,000 GBP, or the value of a salary, etc. It is recommended to use PriceSpecification Types to describe the price of an Offer, Invoice, etc."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:NutritionInformation",
                     "name": "NutritionInformation",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "Nutritional information about the recipe."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:OfferShippingDetails",
                     "name": "OfferShippingDetails",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "OfferShippingDetails represents information about shipping destinations.\n\nMultiple of these entities can be used to represent different shipping rates for different destinations:\n\nOne entity for Alaska/Hawaii. A different one for continental US.A different one for all France...",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:OpeningHoursSpecification",
                     "name": "OpeningHoursSpecification",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "A structured value providing information about the opening hours of a place or a certain service inside a place.\n\nThe place is open if the opens property is specified, and closed otherwise.\n\nIf the value for the closes property is less than the value for the opens property then the hour range is assumed to span over the next day."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:OwnershipInfo",
                     "name": "OwnershipInfo",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "A structured value providing information about when a certain organization or person owned a certain product."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PostalCodeRangeSpecification",
                     "name": "PostalCodeRangeSpecification",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "Indicates a range of postalcodes, usually defined as the set of valid codes between postalCodeBegin and postalCodeEnd, inclusively.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PriceSpecification",
                     "name": "PriceSpecification",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "A structured value representing a price or price range. Typically, only the subclasses of this type are used for markup. It is recommended to use MonetaryAmount to describe independent amounts of money such as a salary, credit card limits, etc.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:CompoundPriceSpecification",
                           "name": "CompoundPriceSpecification",
                           "rdfs:subClassOf": "schema:PriceSpecification",
                           "description": "A compound price specification is one that bundles multiple prices that all apply in combination for different dimensions of consumption. Use the name property of the attached unit price specification for indicating the dimension of a price component (e..."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:DeliveryChargeSpecification",
                           "name": "DeliveryChargeSpecification",
                           "rdfs:subClassOf": "schema:PriceSpecification",
                           "description": "The price for the delivery of an offer using a particular delivery method."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:PaymentChargeSpecification",
                           "name": "PaymentChargeSpecification",
                           "rdfs:subClassOf": "schema:PriceSpecification",
                           "description": "The costs of settling the payment using a particular payment method."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:UnitPriceSpecification",
                           "name": "UnitPriceSpecification",
                           "rdfs:subClassOf": "schema:PriceSpecification",
                           "description": "The price asked for a given offer by the respective organization or person."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PropertyValue",
                     "name": "PropertyValue",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "A property-value pair, e.g. representing a feature of a product or place. Use the 'name' property for the name of the property. If there is an additional human-readable version of the value, put that into the 'description' property.\n\nAlways use specific schema...",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:LocationFeatureSpecification",
                           "name": "LocationFeatureSpecification",
                           "rdfs:subClassOf": "schema:PropertyValue",
                           "description": "Specifies a location feature by providing a structured value representing a feature of an accommodation as a property-value pair of varying degrees of formality."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:QuantitativeValue",
                     "name": "QuantitativeValue",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "A point value or interval for product characteristics and other purposes."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:QuantitativeValueDistribution",
                     "name": "QuantitativeValueDistribution",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "A statistical distribution of values.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MonetaryAmountDistribution",
                           "name": "MonetaryAmountDistribution",
                           "rdfs:subClassOf": "schema:QuantitativeValueDistribution",
                           "description": "A statistical distribution of monetary amounts."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:RepaymentSpecification",
                     "name": "RepaymentSpecification",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "A structured value representing repayment.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ShippingDeliveryTime",
                     "name": "ShippingDeliveryTime",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "ShippingDeliveryTime provides various pieces of information about delivery times for shipping.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ShippingRateSettings",
                     "name": "ShippingRateSettings",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "A ShippingRateSettings represents re-usable pieces of shipping information. It is designed for publication on an URL that may be referenced via the shippingSettingsLink property of an OfferShippingDetails. Several occurrences can be published, distinguished and matched (i...",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TypeAndQuantityNode",
                     "name": "TypeAndQuantityNode",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "A structured value indicating the quantity, unit of measurement, and business function of goods included in a bundle offer."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:WarrantyPromise",
                     "name": "WarrantyPromise",
                     "rdfs:subClassOf": "schema:StructuredValue",
                     "description": "A structured value representing the duration and scope of services that will be provided to a customer free of charge in case of a defect or malfunction of a product."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Ticket",
               "name": "Ticket",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "Used to describe a ticket to an event, a flight, a bus ride, etc."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Trip",
               "name": "Trip",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "A trip or journey. An itinerary of visits to one or more places.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BoatTrip",
                     "name": "BoatTrip",
                     "rdfs:subClassOf": "schema:Trip",
                     "description": "A trip on a commercial ferry line.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BusTrip",
                     "name": "BusTrip",
                     "rdfs:subClassOf": "schema:Trip",
                     "description": "A trip on a commercial bus line."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Flight",
                     "name": "Flight",
                     "rdfs:subClassOf": "schema:Trip",
                     "description": "An airline flight."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TouristTrip",
                     "name": "TouristTrip",
                     "rdfs:subClassOf": "schema:Trip",
                     "description": "A tourist trip. A created itinerary of visits to one or more places of interest (TouristAttraction/TouristDestination) often linked by a similar theme, geographic area, or interest to a particular touristType. The UNWTO defines tourism trip as the Trip taken by visitors...",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TrainTrip",
                     "name": "TrainTrip",
                     "rdfs:subClassOf": "schema:Trip",
                     "description": "A trip on a commercial train line."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:VirtualLocation",
               "name": "VirtualLocation",
               "rdfs:subClassOf": "schema:Intangible",
               "description": "An online or virtual location for attending events. For example, one may attend an online seminar or educational event. While a virtual location may be used as the location of an event, virtual locations should not be confused with physical locations in the real world.",
               "pending": true
            }
         ]
      },
      {
         "@type": "rdfs:Class",
         "@id": "schema:MedicalEntity",
         "name": "MedicalEntity",
         "rdfs:subClassOf": "schema:Thing",
         "description": "The most generic type of entity related to health and the practice of medicine.",
         "children": [
            {
               "@type": "rdfs:Class",
               "@id": "schema:AnatomicalStructure",
               "name": "AnatomicalStructure",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "Any part of the human body, typically a component of an anatomical system. Organs, tissues, and cells are all anatomical structures.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Bone",
                     "name": "Bone",
                     "rdfs:subClassOf": "schema:AnatomicalStructure",
                     "description": "Rigid connective tissue that comprises up the skeletal structure of the human body."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BrainStructure",
                     "name": "BrainStructure",
                     "rdfs:subClassOf": "schema:AnatomicalStructure",
                     "description": "Any anatomical structure which pertains to the soft nervous tissue functioning as the coordinating center of sensation and intellectual and nervous activity."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Joint",
                     "name": "Joint",
                     "rdfs:subClassOf": "schema:AnatomicalStructure",
                     "description": "The anatomical location at which two or more bones make contact."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Ligament",
                     "name": "Ligament",
                     "rdfs:subClassOf": "schema:AnatomicalStructure",
                     "description": "A short band of tough, flexible, fibrous connective tissue that functions to connect multiple bones, cartilages, and structurally support joints."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Muscle",
                     "name": "Muscle",
                     "rdfs:subClassOf": "schema:AnatomicalStructure",
                     "description": "A muscle is an anatomical structure consisting of a contractile form of tissue that animals use to effect movement."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Nerve",
                     "name": "Nerve",
                     "rdfs:subClassOf": "schema:AnatomicalStructure",
                     "description": "A common pathway for the electrochemical nerve impulses that are transmitted along each of the axons."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Vessel",
                     "name": "Vessel",
                     "rdfs:subClassOf": "schema:AnatomicalStructure",
                     "description": "A component of the human body circulatory system comprised of an intricate network of hollow tubes that transport blood throughout the entire body.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Artery",
                           "name": "Artery",
                           "rdfs:subClassOf": "schema:Vessel",
                           "description": "A type of blood vessel that specifically carries blood away from the heart."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:LymphaticVessel",
                           "name": "LymphaticVessel",
                           "rdfs:subClassOf": "schema:Vessel",
                           "description": "A type of blood vessel that specifically carries lymph fluid unidirectionally toward the heart."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Vein",
                           "name": "Vein",
                           "rdfs:subClassOf": "schema:Vessel",
                           "description": "A type of blood vessel that specifically carries blood to the heart."
                        }
                     ]
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:AnatomicalSystem",
               "name": "AnatomicalSystem",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "An anatomical system is a group of anatomical structures that work together to perform a certain task. Anatomical systems, such as organ systems, are one organizing principle of anatomy, and can includes circulatory, digestive, endocrine, integumentary, immune, lymphatic, muscular, nervous, reproductive, respiratory, skeletal, urinary, vestibular, and other systems."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:DrugClass",
               "name": "DrugClass",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "A class of medical drugs, e.g., statins. Classes can represent general pharmacological class, common mechanisms of action, common physiological effects, etc."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:DrugCost",
               "name": "DrugCost",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "The cost per unit of a medical drug. Note that this type is not meant to represent the price in an offer of a drug for sale; see the Offer type for that. This type will typically be used to tag wholesale or average retail cost of a drug, or maximum reimbursable cost..."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:LifestyleModification",
               "name": "LifestyleModification",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "A process of care involving exercise, changes to diet, fitness routines, and other lifestyle changes aimed at improving a health condition.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Diet",
                     "name": "Diet",
                     "rdfs:subClassOf": [
                        "schema:CreativeWork",
                        "schema:LifestyleModification"
                     ],
                     "description": "A strategy of regulating the intake of food to achieve or maintain a specific health-related goal."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PhysicalActivity",
                     "name": "PhysicalActivity",
                     "rdfs:subClassOf": "schema:LifestyleModification",
                     "description": "Any bodily activity that enhances or maintains physical fitness and overall health and wellness. Includes activity that is part of daily living and routine, structured exercise, and exercise prescribed as part of a medical treatment or recovery plan.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ExercisePlan",
                           "name": "ExercisePlan",
                           "rdfs:subClassOf": [
                              "schema:CreativeWork",
                              "schema:PhysicalActivity"
                           ],
                           "description": "Fitness-related activity designed for a specific health-related purpose, including defined exercise routines as well as activity prescribed by a clinician."
                        }
                     ]
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MedicalCause",
               "name": "MedicalCause",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "The causative agent(s) that are responsible for the pathophysiologic process that eventually results in a medical condition, symptom or sign. In this schema, unless otherwise specified this is meant to be the proximate cause of the medical condition, symptom or sign..."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MedicalCondition",
               "name": "MedicalCondition",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "Any condition of the human body that affects the normal functioning of a person, whether physically or mentally. Includes diseases, injuries, disabilities, disorders, syndromes, etc.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:InfectiousDisease",
                     "name": "InfectiousDisease",
                     "rdfs:subClassOf": "schema:MedicalCondition",
                     "description": "An infectious disease is a clinically evident human disease resulting from the presence of pathogenic microbial agents, like pathogenic viruses, pathogenic bacteria, fungi, protozoa, multicellular parasites, and prions. To be considered an infectious disease, such pathogens are known to be able to cause this disease."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MedicalSignOrSymptom",
                     "name": "MedicalSignOrSymptom",
                     "rdfs:subClassOf": "schema:MedicalCondition",
                     "description": "Any feature associated or not with a medical condition. In medicine a symptom is generally subjective while a sign is objective.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MedicalSign",
                           "name": "MedicalSign",
                           "rdfs:subClassOf": "schema:MedicalSignOrSymptom",
                           "description": "Any physical manifestation of a person's medical condition discoverable by objective diagnostic tests or physical examination.",
                           "children": [
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:VitalSign",
                                 "name": "VitalSign",
                                 "rdfs:subClassOf": "schema:MedicalSign",
                                 "description": "Vital signs are measures of various physiological functions in order to assess the most basic body functions."
                              }
                           ]
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MedicalSymptom",
                           "name": "MedicalSymptom",
                           "rdfs:subClassOf": "schema:MedicalSignOrSymptom",
                           "description": "Any complaint sensed and expressed by the patient (therefore defined as subjective)  like stomachache, lower-back pain, or fatigue."
                        }
                     ]
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MedicalContraindication",
               "name": "MedicalContraindication",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "A condition or factor that serves as a reason to withhold a certain medical therapy. Contraindications can be absolute (there are no reasonable circumstances for undertaking a course of action) or relative (the patient is at higher risk of complications, but that these risks may be outweighed by other considerations or mitigated by other measures)."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MedicalDevice",
               "name": "MedicalDevice",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "Any object used in a medical capacity, such as to diagnose or treat a patient."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MedicalGuideline",
               "name": "MedicalGuideline",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "Any recommendation made by a standard society (e.g. ACC/AHA) or consensus statement that denotes how to diagnose and treat a particular condition. Note: this type should be used to tag the actual guideline recommendation; if the guideline recommendation occurs in a larger scholarly article, use MedicalScholarlyArticle to tag the overall article, not this type...",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MedicalGuidelineContraindication",
                     "name": "MedicalGuidelineContraindication",
                     "rdfs:subClassOf": "schema:MedicalGuideline",
                     "description": "A guideline contraindication that designates a process as harmful and where quality of the data supporting the contraindication is sound."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MedicalGuidelineRecommendation",
                     "name": "MedicalGuidelineRecommendation",
                     "rdfs:subClassOf": "schema:MedicalGuideline",
                     "description": "A guideline recommendation that is regarded as efficacious and where quality of the data supporting the recommendation is sound."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MedicalIndication",
               "name": "MedicalIndication",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "A condition or factor that indicates use of a medical therapy, including signs, symptoms, risk factors, anatomical states, etc.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ApprovedIndication",
                     "name": "ApprovedIndication",
                     "rdfs:subClassOf": "schema:MedicalIndication",
                     "description": "An indication for a medical therapy that has been formally specified or approved by a regulatory body that regulates use of the therapy; for example, the US FDA approves indications for most drugs in the US."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PreventionIndication",
                     "name": "PreventionIndication",
                     "rdfs:subClassOf": "schema:MedicalIndication",
                     "description": "An indication for preventing an underlying condition, symptom, etc."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TreatmentIndication",
                     "name": "TreatmentIndication",
                     "rdfs:subClassOf": "schema:MedicalIndication",
                     "description": "An indication for treating an underlying condition, symptom, etc."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MedicalIntangible",
               "name": "MedicalIntangible",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "A utility class that serves as the umbrella for a number of 'intangible' things in the medical space.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DDxElement",
                     "name": "DDxElement",
                     "rdfs:subClassOf": "schema:MedicalIntangible",
                     "description": "An alternative, closely-related condition typically considered later in the differential diagnosis process along with the signs that are used to distinguish it."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DoseSchedule",
                     "name": "DoseSchedule",
                     "rdfs:subClassOf": "schema:MedicalIntangible",
                     "description": "A specific dosing schedule for a drug or supplement.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MaximumDoseSchedule",
                           "name": "MaximumDoseSchedule",
                           "rdfs:subClassOf": "schema:DoseSchedule",
                           "description": "The maximum dosing schedule considered safe for a drug or supplement as recommended by an authority or by the drug/supplement's manufacturer. Capture the recommending authority in the recognizingAuthority property of MedicalEntity."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:RecommendedDoseSchedule",
                           "name": "RecommendedDoseSchedule",
                           "rdfs:subClassOf": "schema:DoseSchedule",
                           "description": "A recommended dosing schedule for a drug or supplement as prescribed or recommended by an authority or by the drug/supplement's manufacturer. Capture the recommending authority in the recognizingAuthority property of MedicalEntity."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ReportedDoseSchedule",
                           "name": "ReportedDoseSchedule",
                           "rdfs:subClassOf": "schema:DoseSchedule",
                           "description": "A patient-reported or observed dosing schedule for a drug or supplement."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DrugLegalStatus",
                     "name": "DrugLegalStatus",
                     "rdfs:subClassOf": "schema:MedicalIntangible",
                     "description": "The legal availability status of a medical drug."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DrugStrength",
                     "name": "DrugStrength",
                     "rdfs:subClassOf": "schema:MedicalIntangible",
                     "description": "A specific strength in which a medical drug is available in a specific country."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MedicalCode",
                     "name": "MedicalCode",
                     "rdfs:subClassOf": [
                        "schema:CategoryCode",
                        "schema:MedicalIntangible"
                     ],
                     "description": "A code for a medical entity."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MedicalConditionStage",
                     "name": "MedicalConditionStage",
                     "rdfs:subClassOf": "schema:MedicalIntangible",
                     "description": "A stage of a medical condition, such as 'Stage IIIa'."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MedicalProcedure",
               "name": "MedicalProcedure",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "A process of care used in either a diagnostic, therapeutic, preventive or palliative capacity that relies on invasive (surgical), non-invasive, or other techniques.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DiagnosticProcedure",
                     "name": "DiagnosticProcedure",
                     "rdfs:subClassOf": "schema:MedicalProcedure",
                     "description": "A medical procedure intended primarily for diagnostic, as opposed to therapeutic, purposes."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PalliativeProcedure",
                     "name": "PalliativeProcedure",
                     "rdfs:subClassOf": [
                        "schema:MedicalProcedure",
                        "schema:MedicalTherapy"
                     ],
                     "description": "A medical procedure intended primarily for palliative purposes, aimed at relieving the symptoms of an underlying health condition."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PhysicalExam",
                     "name": "PhysicalExam",
                     "rdfs:subClassOf": [
                        "schema:MedicalEnumeration",
                        "schema:MedicalProcedure"
                     ],
                     "description": "A type of physical examination of a patient performed by a physician."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:SurgicalProcedure",
                     "name": "SurgicalProcedure",
                     "rdfs:subClassOf": "schema:MedicalProcedure",
                     "description": "A medical procedure involving an incision with instruments; performed for diagnose, or therapeutic purposes."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TherapeuticProcedure",
                     "name": "TherapeuticProcedure",
                     "rdfs:subClassOf": "schema:MedicalProcedure",
                     "description": "A medical procedure intended primarily for therapeutic purposes, aimed at improving a health condition.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MedicalTherapy",
                           "name": "MedicalTherapy",
                           "rdfs:subClassOf": "schema:TherapeuticProcedure",
                           "description": "Any medical intervention designed to prevent, treat, and cure human diseases and medical conditions, including both curative and palliative therapies. Medical therapies are typically processes of care relying upon pharmacotherapy, behavioral therapy, supportive therapy (with fluid or nutrition for example), or detoxification (e...",
                           "children": [
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:OccupationalTherapy",
                                 "name": "OccupationalTherapy",
                                 "rdfs:subClassOf": "schema:MedicalTherapy",
                                 "description": "A treatment of people with physical, emotional, or social problems, using purposeful activity to help them overcome or learn to deal with their problems."
                              },
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:PalliativeProcedure",
                                 "name": "PalliativeProcedure",
                                 "rdfs:subClassOf": [
                                    "schema:MedicalProcedure",
                                    "schema:MedicalTherapy"
                                 ],
                                 "description": "A medical procedure intended primarily for palliative purposes, aimed at relieving the symptoms of an underlying health condition."
                              },
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:PhysicalTherapy",
                                 "name": "PhysicalTherapy",
                                 "rdfs:subClassOf": "schema:MedicalTherapy",
                                 "description": "A process of progressive physical care and rehabilitation aimed at improving a health condition."
                              },
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:RadiationTherapy",
                                 "name": "RadiationTherapy",
                                 "rdfs:subClassOf": "schema:MedicalTherapy",
                                 "description": "A process of care using radiation aimed at improving a health condition."
                              },
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:RespiratoryTherapy",
                                 "name": "RespiratoryTherapy",
                                 "rdfs:subClassOf": [
                                    "schema:MedicalTherapy",
                                    "schema:MedicalSpecialty"
                                 ],
                                 "description": "The therapy that is concerned with the maintenance or improvement of respiratory function (as in patients with pulmonary disease)."
                              }
                           ]
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:PsychologicalTreatment",
                           "name": "PsychologicalTreatment",
                           "rdfs:subClassOf": "schema:TherapeuticProcedure",
                           "description": "A process of care relying upon counseling, dialogue and communication  aimed at improving a mental health condition without use of drugs."
                        }
                     ]
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MedicalRiskEstimator",
               "name": "MedicalRiskEstimator",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "Any rule set or interactive tool for estimating the risk of developing a complication or condition.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MedicalRiskCalculator",
                     "name": "MedicalRiskCalculator",
                     "rdfs:subClassOf": "schema:MedicalRiskEstimator",
                     "description": "A complex mathematical calculation requiring an online calculator, used to assess prognosis. Note: use the url property of Thing to record any URLs for online calculators."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MedicalRiskScore",
                     "name": "MedicalRiskScore",
                     "rdfs:subClassOf": "schema:MedicalRiskEstimator",
                     "description": "A simple system that adds up the number of risk factors to yield a score that is associated with prognosis, e.g. CHAD score, TIMI risk score."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MedicalRiskFactor",
               "name": "MedicalRiskFactor",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "A risk factor is anything that increases a person's likelihood of developing or contracting a disease, medical condition, or complication."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MedicalStudy",
               "name": "MedicalStudy",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "A medical study is an umbrella type covering all kinds of research studies relating to human medicine or health, including observational studies and interventional trials and registries, randomized, controlled or not. When the specific type of study is known, use one of the extensions of this type, such as MedicalTrial or MedicalObservationalStudy...",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MedicalObservationalStudy",
                     "name": "MedicalObservationalStudy",
                     "rdfs:subClassOf": "schema:MedicalStudy",
                     "description": "An observational study is a type of medical study that attempts to infer the possible effect of a treatment through observation of a cohort of subjects over a period of time. In an observational study, the assignment of subjects into treatment groups versus control groups is outside the control of the investigator..."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MedicalTrial",
                     "name": "MedicalTrial",
                     "rdfs:subClassOf": "schema:MedicalStudy",
                     "description": "A medical trial is a type of medical study that uses scientific process used to compare the safety and efficacy of medical therapies or medical procedures. In general, medical trials are controlled and subjects are allocated at random to the different treatment and/or control groups."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MedicalTest",
               "name": "MedicalTest",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "Any medical test, typically performed for diagnostic purposes.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BloodTest",
                     "name": "BloodTest",
                     "rdfs:subClassOf": "schema:MedicalTest",
                     "description": "A medical test performed on a sample of a patient's blood."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ImagingTest",
                     "name": "ImagingTest",
                     "rdfs:subClassOf": "schema:MedicalTest",
                     "description": "Any medical imaging modality typically used for diagnostic purposes."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MedicalTestPanel",
                     "name": "MedicalTestPanel",
                     "rdfs:subClassOf": "schema:MedicalTest",
                     "description": "Any collection of tests commonly ordered together."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PathologyTest",
                     "name": "PathologyTest",
                     "rdfs:subClassOf": "schema:MedicalTest",
                     "description": "A medical test performed by a laboratory that typically involves examination of a tissue sample by a pathologist."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Substance",
               "name": "Substance",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "Any matter of defined composition that has discrete existence, whose origin may be biological, mineral or chemical.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DietarySupplement",
                     "name": "DietarySupplement",
                     "rdfs:subClassOf": "schema:Substance",
                     "description": "A product taken by mouth that contains a dietary ingredient intended to supplement the diet. Dietary ingredients may include vitamins, minerals, herbs or other botanicals, amino acids, and substances such as enzymes, organ tissues, glandulars and metabolites."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Drug",
                     "name": "Drug",
                     "rdfs:subClassOf": "schema:Substance",
                     "description": "A chemical or biologic substance, used as a medical therapy, that has a physiological effect on an organism. Here the term drug is used interchangeably with the term medicine although clinical knowledge make a clear difference between them."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:SuperficialAnatomy",
               "name": "SuperficialAnatomy",
               "rdfs:subClassOf": "schema:MedicalEntity",
               "description": "Anatomical features that can be observed by sight (without dissection), including the form and proportions of the human body as well as surface landmarks that correspond to deeper subcutaneous structures. Superficial anatomy plays an important role in sports medicine, phlebotomy, and other medical specialties as underlying anatomical structures can be identified through surface palpation..."
            }
         ]
      },
      {
         "@type": "rdfs:Class",
         "@id": "schema:Organization",
         "name": "Organization",
         "rdfs:subClassOf": "schema:Thing",
         "description": "An organization such as a school, NGO, corporation, club, etc.",
         "children": [
            {
               "@type": "rdfs:Class",
               "@id": "schema:Airline",
               "name": "Airline",
               "rdfs:subClassOf": "schema:Organization",
               "description": "An organization that provides flights for passengers."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Consortium",
               "name": "Consortium",
               "rdfs:subClassOf": "schema:Organization",
               "description": "A Consortium is a membership Organization whose members are typically Organizations.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Corporation",
               "name": "Corporation",
               "rdfs:subClassOf": "schema:Organization",
               "description": "Organization: A business corporation."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:EducationalOrganization",
               "name": "EducationalOrganization",
               "rdfs:subClassOf": [
                  "schema:CivicStructure",
                  "schema:Organization"
               ],
               "description": "An educational organization.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:CollegeOrUniversity",
                     "name": "CollegeOrUniversity",
                     "rdfs:subClassOf": "schema:EducationalOrganization",
                     "description": "A college, university, or other third-level educational institution."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ElementarySchool",
                     "name": "ElementarySchool",
                     "rdfs:subClassOf": "schema:EducationalOrganization",
                     "description": "An elementary school."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:HighSchool",
                     "name": "HighSchool",
                     "rdfs:subClassOf": "schema:EducationalOrganization",
                     "description": "A high school."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MiddleSchool",
                     "name": "MiddleSchool",
                     "rdfs:subClassOf": "schema:EducationalOrganization",
                     "description": "A middle school (typically for children aged around 11-14, although this varies somewhat)."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Preschool",
                     "name": "Preschool",
                     "rdfs:subClassOf": "schema:EducationalOrganization",
                     "description": "A preschool."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:School",
                     "name": "School",
                     "rdfs:subClassOf": "schema:EducationalOrganization",
                     "description": "A school."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:FundingScheme",
               "name": "FundingScheme",
               "rdfs:subClassOf": "schema:Organization",
               "description": "A FundingScheme combines organizational, project and policy aspects of grant-based funding\n    that sets guidelines, principles and mechanisms to support other kinds of projects and activities.\n    Funding is typically organized via Grant funding. Examples of funding schemes: Swiss Priority Programmes (SPPs); EU Framework 7 (FP7); Horizon 2020; the NIH-R01 Grant Program; Wellcome institutional strategic support fund...",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:GovernmentOrganization",
               "name": "GovernmentOrganization",
               "rdfs:subClassOf": "schema:Organization",
               "description": "A governmental organization or agency."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:LibrarySystem",
               "name": "LibrarySystem",
               "rdfs:subClassOf": "schema:Organization",
               "description": "A LibrarySystem is a collaborative system amongst several libraries.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:LocalBusiness",
               "name": "LocalBusiness",
               "rdfs:subClassOf": [
                  "schema:Organization",
                  "schema:Place"
               ],
               "description": "A particular physical business or branch of an organization. Examples of LocalBusiness include a restaurant, a particular branch of a restaurant chain, a branch of a bank, a medical practice, a club, a bowling alley, etc.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:AnimalShelter",
                     "name": "AnimalShelter",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "Animal shelter."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ArchiveOrganization",
                     "name": "ArchiveOrganization",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "An organization with archival holdings. An organization which keeps and preserves archival material and typically makes it accessible to the public.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:AutomotiveBusiness",
                     "name": "AutomotiveBusiness",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "Car repair, sales, or parts.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AutoBodyShop",
                           "name": "AutoBodyShop",
                           "rdfs:subClassOf": "schema:AutomotiveBusiness",
                           "description": "Auto body shop."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AutoDealer",
                           "name": "AutoDealer",
                           "rdfs:subClassOf": "schema:AutomotiveBusiness",
                           "description": "An car dealership."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AutoPartsStore",
                           "name": "AutoPartsStore",
                           "rdfs:subClassOf": [
                              "schema:AutomotiveBusiness",
                              "schema:Store"
                           ],
                           "description": "An auto parts store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AutoRental",
                           "name": "AutoRental",
                           "rdfs:subClassOf": "schema:AutomotiveBusiness",
                           "description": "A car rental business."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AutoRepair",
                           "name": "AutoRepair",
                           "rdfs:subClassOf": "schema:AutomotiveBusiness",
                           "description": "Car repair business."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AutoWash",
                           "name": "AutoWash",
                           "rdfs:subClassOf": "schema:AutomotiveBusiness",
                           "description": "A car wash business."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:GasStation",
                           "name": "GasStation",
                           "rdfs:subClassOf": "schema:AutomotiveBusiness",
                           "description": "A gas station."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MotorcycleDealer",
                           "name": "MotorcycleDealer",
                           "rdfs:subClassOf": "schema:AutomotiveBusiness",
                           "description": "A motorcycle dealer."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MotorcycleRepair",
                           "name": "MotorcycleRepair",
                           "rdfs:subClassOf": "schema:AutomotiveBusiness",
                           "description": "A motorcycle repair shop."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ChildCare",
                     "name": "ChildCare",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A Childcare center."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Dentist",
                     "name": "Dentist",
                     "rdfs:subClassOf": [
                        "schema:LocalBusiness",
                        "schema:MedicalBusiness",
                        "schema:MedicalOrganization"
                     ],
                     "description": "A dentist."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DryCleaningOrLaundry",
                     "name": "DryCleaningOrLaundry",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A dry-cleaning business."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:EmergencyService",
                     "name": "EmergencyService",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "An emergency service, such as a fire station or ER.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:FireStation",
                           "name": "FireStation",
                           "rdfs:subClassOf": [
                              "schema:CivicStructure",
                              "schema:EmergencyService"
                           ],
                           "description": "A fire station. With firemen."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Hospital",
                           "name": "Hospital",
                           "rdfs:subClassOf": [
                              "schema:CivicStructure",
                              "schema:EmergencyService",
                              "schema:MedicalOrganization"
                           ],
                           "description": "A hospital."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:PoliceStation",
                           "name": "PoliceStation",
                           "rdfs:subClassOf": [
                              "schema:CivicStructure",
                              "schema:EmergencyService"
                           ],
                           "description": "A police station."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:EmploymentAgency",
                     "name": "EmploymentAgency",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "An employment agency."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:EntertainmentBusiness",
                     "name": "EntertainmentBusiness",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A business providing entertainment.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AdultEntertainment",
                           "name": "AdultEntertainment",
                           "rdfs:subClassOf": "schema:EntertainmentBusiness",
                           "description": "An adult entertainment establishment."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AmusementPark",
                           "name": "AmusementPark",
                           "rdfs:subClassOf": "schema:EntertainmentBusiness",
                           "description": "An amusement park."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ArtGallery",
                           "name": "ArtGallery",
                           "rdfs:subClassOf": "schema:EntertainmentBusiness",
                           "description": "An art gallery."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Casino",
                           "name": "Casino",
                           "rdfs:subClassOf": "schema:EntertainmentBusiness",
                           "description": "A casino."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ComedyClub",
                           "name": "ComedyClub",
                           "rdfs:subClassOf": "schema:EntertainmentBusiness",
                           "description": "A comedy club."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MovieTheater",
                           "name": "MovieTheater",
                           "rdfs:subClassOf": [
                              "schema:CivicStructure",
                              "schema:EntertainmentBusiness"
                           ],
                           "description": "A movie theater."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:NightClub",
                           "name": "NightClub",
                           "rdfs:subClassOf": "schema:EntertainmentBusiness",
                           "description": "A nightclub or discotheque."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:FinancialService",
                     "name": "FinancialService",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "Financial services business.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AccountingService",
                           "name": "AccountingService",
                           "rdfs:subClassOf": "schema:FinancialService",
                           "description": "Accountancy business.\n\nAs a LocalBusiness it can be described as a provider of one or more Service(s)."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AutomatedTeller",
                           "name": "AutomatedTeller",
                           "rdfs:subClassOf": "schema:FinancialService",
                           "description": "ATM/cash machine."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:BankOrCreditUnion",
                           "name": "BankOrCreditUnion",
                           "rdfs:subClassOf": "schema:FinancialService",
                           "description": "Bank or credit union."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:InsuranceAgency",
                           "name": "InsuranceAgency",
                           "rdfs:subClassOf": "schema:FinancialService",
                           "description": "An Insurance agency."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:FoodEstablishment",
                     "name": "FoodEstablishment",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A food-related business.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Bakery",
                           "name": "Bakery",
                           "rdfs:subClassOf": "schema:FoodEstablishment",
                           "description": "A bakery."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:BarOrPub",
                           "name": "BarOrPub",
                           "rdfs:subClassOf": "schema:FoodEstablishment",
                           "description": "A bar or pub."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Brewery",
                           "name": "Brewery",
                           "rdfs:subClassOf": "schema:FoodEstablishment",
                           "description": "Brewery."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:CafeOrCoffeeShop",
                           "name": "CafeOrCoffeeShop",
                           "rdfs:subClassOf": "schema:FoodEstablishment",
                           "description": "A cafe or coffee shop."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Distillery",
                           "name": "Distillery",
                           "rdfs:subClassOf": "schema:FoodEstablishment",
                           "description": "A distillery."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:FastFoodRestaurant",
                           "name": "FastFoodRestaurant",
                           "rdfs:subClassOf": "schema:FoodEstablishment",
                           "description": "A fast-food restaurant."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:IceCreamShop",
                           "name": "IceCreamShop",
                           "rdfs:subClassOf": "schema:FoodEstablishment",
                           "description": "An ice cream shop."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Restaurant",
                           "name": "Restaurant",
                           "rdfs:subClassOf": "schema:FoodEstablishment",
                           "description": "A restaurant."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Winery",
                           "name": "Winery",
                           "rdfs:subClassOf": "schema:FoodEstablishment",
                           "description": "A winery."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:GovernmentOffice",
                     "name": "GovernmentOffice",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A government office&#x2014;for example, an IRS or DMV office.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:PostOffice",
                           "name": "PostOffice",
                           "rdfs:subClassOf": "schema:GovernmentOffice",
                           "description": "A post office."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:HealthAndBeautyBusiness",
                     "name": "HealthAndBeautyBusiness",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "Health and beauty.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:BeautySalon",
                           "name": "BeautySalon",
                           "rdfs:subClassOf": "schema:HealthAndBeautyBusiness",
                           "description": "Beauty salon."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:DaySpa",
                           "name": "DaySpa",
                           "rdfs:subClassOf": "schema:HealthAndBeautyBusiness",
                           "description": "A day spa."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:HairSalon",
                           "name": "HairSalon",
                           "rdfs:subClassOf": "schema:HealthAndBeautyBusiness",
                           "description": "A hair salon."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:HealthClub",
                           "name": "HealthClub",
                           "rdfs:subClassOf": [
                              "schema:HealthAndBeautyBusiness",
                              "schema:SportsActivityLocation"
                           ],
                           "description": "A health club."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:NailSalon",
                           "name": "NailSalon",
                           "rdfs:subClassOf": "schema:HealthAndBeautyBusiness",
                           "description": "A nail salon."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:TattooParlor",
                           "name": "TattooParlor",
                           "rdfs:subClassOf": "schema:HealthAndBeautyBusiness",
                           "description": "A tattoo parlor."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:HomeAndConstructionBusiness",
                     "name": "HomeAndConstructionBusiness",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A construction business.\n\nA HomeAndConstructionBusiness is a LocalBusiness that provides services around homes and buildings.\n\nAs a LocalBusiness it can be described as a provider of one or more Service(s).",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Electrician",
                           "name": "Electrician",
                           "rdfs:subClassOf": "schema:HomeAndConstructionBusiness",
                           "description": "An electrician."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:GeneralContractor",
                           "name": "GeneralContractor",
                           "rdfs:subClassOf": "schema:HomeAndConstructionBusiness",
                           "description": "A general contractor."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:HVACBusiness",
                           "name": "HVACBusiness",
                           "rdfs:subClassOf": "schema:HomeAndConstructionBusiness",
                           "description": "A business that provide Heating, Ventilation and Air Conditioning services."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:HousePainter",
                           "name": "HousePainter",
                           "rdfs:subClassOf": "schema:HomeAndConstructionBusiness",
                           "description": "A house painting service."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Locksmith",
                           "name": "Locksmith",
                           "rdfs:subClassOf": "schema:HomeAndConstructionBusiness",
                           "description": "A locksmith."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MovingCompany",
                           "name": "MovingCompany",
                           "rdfs:subClassOf": "schema:HomeAndConstructionBusiness",
                           "description": "A moving company."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Plumber",
                           "name": "Plumber",
                           "rdfs:subClassOf": "schema:HomeAndConstructionBusiness",
                           "description": "A plumbing service."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:RoofingContractor",
                           "name": "RoofingContractor",
                           "rdfs:subClassOf": "schema:HomeAndConstructionBusiness",
                           "description": "A roofing contractor."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:InternetCafe",
                     "name": "InternetCafe",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "An internet cafe."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:LegalService",
                     "name": "LegalService",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A LegalService is a business that provides legally-oriented services, advice and representation, e.g. law firms.\n\nAs a LocalBusiness it can be described as a provider of one or more Service(s).",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Attorney",
                           "name": "Attorney",
                           "rdfs:subClassOf": "schema:LegalService",
                           "description": "Professional service: Attorney. \n\nThis type is deprecated - LegalService is more inclusive and less ambiguous."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Notary",
                           "name": "Notary",
                           "rdfs:subClassOf": "schema:LegalService",
                           "description": "A notary."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Library",
                     "name": "Library",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A library."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:LodgingBusiness",
                     "name": "LodgingBusiness",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A lodging business, such as a motel, hotel, or inn.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:BedAndBreakfast",
                           "name": "BedAndBreakfast",
                           "rdfs:subClassOf": "schema:LodgingBusiness",
                           "description": "Bed and breakfast.\n\nSee also the dedicated document on the use of schema.org for marking up hotels and other forms of accommodations."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Campground",
                           "name": "Campground",
                           "rdfs:subClassOf": [
                              "schema:CivicStructure",
                              "schema:LodgingBusiness"
                           ],
                           "description": "A camping site, campsite, or Campground is a place used for overnight stay in the outdoors, typically containing individual CampingPitch locations. \n\nIn British English a campsite is an area, usually divided into a number of pitches, where people can camp overnight using tents or camper vans or caravans; this British English use of the word is synonymous with the American English expression campground..."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Hostel",
                           "name": "Hostel",
                           "rdfs:subClassOf": "schema:LodgingBusiness",
                           "description": "A hostel - cheap accommodation, often in shared dormitories.\n\nSee also the dedicated document on the use of schema.org for marking up hotels and other forms of accommodations."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Hotel",
                           "name": "Hotel",
                           "rdfs:subClassOf": "schema:LodgingBusiness",
                           "description": "A hotel is an establishment that provides lodging paid on a short-term basis (Source: Wikipedia, the free encyclopedia, see http://en.wikipedia.org/wiki/Hotel).\n\nSee also the dedicated document on the use of schema.org for marking up hotels and other forms of accommodations."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Motel",
                           "name": "Motel",
                           "rdfs:subClassOf": "schema:LodgingBusiness",
                           "description": "A motel.\n\nSee also the dedicated document on the use of schema.org for marking up hotels and other forms of accommodations."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Resort",
                           "name": "Resort",
                           "rdfs:subClassOf": "schema:LodgingBusiness",
                           "description": "A resort is a place used for relaxation or recreation, attracting visitors for holidays or vacations. Resorts are places, towns or sometimes commercial establishment operated by a single company (Source: Wikipedia, the free encyclopedia, see http://en...",
                           "children": [
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:SkiResort",
                                 "name": "SkiResort",
                                 "rdfs:subClassOf": [
                                    "schema:Resort",
                                    "schema:SportsActivityLocation"
                                 ],
                                 "description": "A ski resort."
                              }
                           ]
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MedicalBusiness",
                     "name": "MedicalBusiness",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A particular physical or virtual business of an organization for medical purposes. Examples of MedicalBusiness include differents business run by health professionals.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:CommunityHealth",
                           "name": "CommunityHealth",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "A field of public health focusing on improving health characteristics of a defined population in relation with their geographical or environment areas."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Dentist",
                           "name": "Dentist",
                           "rdfs:subClassOf": [
                              "schema:LocalBusiness",
                              "schema:MedicalBusiness",
                              "schema:MedicalOrganization"
                           ],
                           "description": "A dentist."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Dermatology",
                           "name": "Dermatology",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "A specific branch of medical science that pertains to diagnosis and treatment of disorders of skin."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:DietNutrition",
                           "name": "DietNutrition",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "Dietetic and nutrition as a medical specialty."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Emergency",
                           "name": "Emergency",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "A specific branch of medical science that deals with the evaluation and initial treatment of medical conditions caused by trauma or sudden illness."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Geriatric",
                           "name": "Geriatric",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "A specific branch of medical science that is concerned with the diagnosis and treatment of diseases, debilities and provision of care to the aged."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Gynecologic",
                           "name": "Gynecologic",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "A specific branch of medical science that pertains to the health care of women, particularly in the diagnosis and treatment of disorders affecting the female reproductive system."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MedicalClinic",
                           "name": "MedicalClinic",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalOrganization"
                           ],
                           "description": "A facility, often associated with a hospital or medical school, that is devoted to the specific diagnosis and/or healthcare. Previously limited to outpatients but with evolution it may be open to inpatients as well.",
                           "children": [
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:CovidTestingFacility",
                                 "name": "CovidTestingFacility",
                                 "rdfs:subClassOf": "schema:MedicalClinic",
                                 "description": "A CovidTestingFacility is a MedicalClinic where testing for the COVID-19 Coronavirus\n      disease is available. If the facility is being made available from an established Pharmacy, Hotel, or other\n      non-medical organization, multiple types can be listed...",
                                 "pending": true
                              }
                           ]
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Midwifery",
                           "name": "Midwifery",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "A nurse-like health profession that deals with pregnancy, childbirth, and the postpartum period (including care of the newborn), besides sexual and reproductive health of women throughout their lives."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Nursing",
                           "name": "Nursing",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "A health profession of a person formally educated and trained in the care of the sick or infirm person."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Obstetric",
                           "name": "Obstetric",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "A specific branch of medical science that specializes in the care of women during the prenatal and postnatal care and with the delivery of the child."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Oncologic",
                           "name": "Oncologic",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "A specific branch of medical science that deals with benign and malignant tumors, including the study of their development, diagnosis, treatment and prevention."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Optician",
                           "name": "Optician",
                           "rdfs:subClassOf": "schema:MedicalBusiness",
                           "description": "A store that sells reading glasses and similar devices for improving vision."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Optometric",
                           "name": "Optometric",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "The science or practice of testing visual acuity and prescribing corrective lenses."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Otolaryngologic",
                           "name": "Otolaryngologic",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "A specific branch of medical science that is concerned with the ear, nose and throat and their respective disease states."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Pediatric",
                           "name": "Pediatric",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "A specific branch of medical science that specializes in the care of infants, children and adolescents."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Pharmacy",
                           "name": "Pharmacy",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalOrganization"
                           ],
                           "description": "A pharmacy or drugstore."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Physician",
                           "name": "Physician",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalOrganization"
                           ],
                           "description": "A doctor's office."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Physiotherapy",
                           "name": "Physiotherapy",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "The practice of treatment of disease, injury, or deformity by physical methods such as massage, heat treatment, and exercise rather than by drugs or surgery.."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:PlasticSurgery",
                           "name": "PlasticSurgery",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "A specific branch of medical science that pertains to therapeutic or cosmetic repair or re-formation of missing, injured or malformed tissues or body parts by manual and instrumental means."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Podiatric",
                           "name": "Podiatric",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "Podiatry is the care of the human foot, especially the diagnosis and treatment of foot disorders."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:PrimaryCare",
                           "name": "PrimaryCare",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "The medical care by a physician, or other health-care professional, who is the patient's first contact with the health-care system and who may recommend a specialist if necessary."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Psychiatric",
                           "name": "Psychiatric",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "A specific branch of medical science that is concerned with the study, treatment, and prevention of mental illness, using both medical and psychological therapies."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:PublicHealth",
                           "name": "PublicHealth",
                           "rdfs:subClassOf": [
                              "schema:MedicalBusiness",
                              "schema:MedicalSpecialty"
                           ],
                           "description": "Branch of medicine that pertains to the health services to improve and protect community health, especially epidemiology, sanitation, immunization, and preventive medicine."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ProfessionalService",
                     "name": "ProfessionalService",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "Original definition: \"provider of professional services.\"\n\nThe general ProfessionalService type for local businesses was deprecated due to confusion with Service. For reference, the types that it included were: Dentist,\n        AccountingService, Attorney, Notary, as well as types for several kinds of HomeAndConstructionBusiness: Electrician, GeneralContractor,\n        HousePainter, Locksmith, Plumber, RoofingContractor..."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:RadioStation",
                     "name": "RadioStation",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A radio station."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:RealEstateAgent",
                     "name": "RealEstateAgent",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A real-estate agent."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:RecyclingCenter",
                     "name": "RecyclingCenter",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A recycling center."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:SelfStorage",
                     "name": "SelfStorage",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A self-storage facility."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ShoppingCenter",
                     "name": "ShoppingCenter",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A shopping center or mall."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:SportsActivityLocation",
                     "name": "SportsActivityLocation",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A sports location, such as a playing field.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:BowlingAlley",
                           "name": "BowlingAlley",
                           "rdfs:subClassOf": "schema:SportsActivityLocation",
                           "description": "A bowling alley."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ExerciseGym",
                           "name": "ExerciseGym",
                           "rdfs:subClassOf": "schema:SportsActivityLocation",
                           "description": "A gym."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:GolfCourse",
                           "name": "GolfCourse",
                           "rdfs:subClassOf": "schema:SportsActivityLocation",
                           "description": "A golf course."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:HealthClub",
                           "name": "HealthClub",
                           "rdfs:subClassOf": [
                              "schema:HealthAndBeautyBusiness",
                              "schema:SportsActivityLocation"
                           ],
                           "description": "A health club."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:PublicSwimmingPool",
                           "name": "PublicSwimmingPool",
                           "rdfs:subClassOf": "schema:SportsActivityLocation",
                           "description": "A public swimming pool."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:SkiResort",
                           "name": "SkiResort",
                           "rdfs:subClassOf": [
                              "schema:Resort",
                              "schema:SportsActivityLocation"
                           ],
                           "description": "A ski resort."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:SportsClub",
                           "name": "SportsClub",
                           "rdfs:subClassOf": "schema:SportsActivityLocation",
                           "description": "A sports club."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:StadiumOrArena",
                           "name": "StadiumOrArena",
                           "rdfs:subClassOf": [
                              "schema:CivicStructure",
                              "schema:SportsActivityLocation"
                           ],
                           "description": "A stadium."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:TennisComplex",
                           "name": "TennisComplex",
                           "rdfs:subClassOf": "schema:SportsActivityLocation",
                           "description": "A tennis complex."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Store",
                     "name": "Store",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A retail good store.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:AutoPartsStore",
                           "name": "AutoPartsStore",
                           "rdfs:subClassOf": [
                              "schema:AutomotiveBusiness",
                              "schema:Store"
                           ],
                           "description": "An auto parts store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:BikeStore",
                           "name": "BikeStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A bike store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:BookStore",
                           "name": "BookStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A bookstore."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ClothingStore",
                           "name": "ClothingStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A clothing store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ComputerStore",
                           "name": "ComputerStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A computer store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ConvenienceStore",
                           "name": "ConvenienceStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A convenience store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:DepartmentStore",
                           "name": "DepartmentStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A department store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ElectronicsStore",
                           "name": "ElectronicsStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "An electronics store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Florist",
                           "name": "Florist",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A florist."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:FurnitureStore",
                           "name": "FurnitureStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A furniture store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:GardenStore",
                           "name": "GardenStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A garden store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:GroceryStore",
                           "name": "GroceryStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A grocery store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:HardwareStore",
                           "name": "HardwareStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A hardware store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:HobbyShop",
                           "name": "HobbyShop",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A store that sells materials useful or necessary for various hobbies."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:HomeGoodsStore",
                           "name": "HomeGoodsStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A home goods store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:JewelryStore",
                           "name": "JewelryStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A jewelry store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:LiquorStore",
                           "name": "LiquorStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A shop that sells alcoholic drinks such as wine, beer, whisky and other spirits."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MensClothingStore",
                           "name": "MensClothingStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A men's clothing store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MobilePhoneStore",
                           "name": "MobilePhoneStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A store that sells mobile phones and related accessories."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MovieRentalStore",
                           "name": "MovieRentalStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A movie rental store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MusicStore",
                           "name": "MusicStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A music store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:OfficeEquipmentStore",
                           "name": "OfficeEquipmentStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "An office equipment store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:OutletStore",
                           "name": "OutletStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "An outlet store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:PawnShop",
                           "name": "PawnShop",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A shop that will buy, or lend money against the security of, personal possessions."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:PetStore",
                           "name": "PetStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A pet store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ShoeStore",
                           "name": "ShoeStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A shoe store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:SportingGoodsStore",
                           "name": "SportingGoodsStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A sporting goods store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:TireShop",
                           "name": "TireShop",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A tire shop."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:ToyStore",
                           "name": "ToyStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A toy store."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:WholesaleStore",
                           "name": "WholesaleStore",
                           "rdfs:subClassOf": "schema:Store",
                           "description": "A wholesale store."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TelevisionStation",
                     "name": "TelevisionStation",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A television station."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TouristInformationCenter",
                     "name": "TouristInformationCenter",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A tourist information center."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TravelAgency",
                     "name": "TravelAgency",
                     "rdfs:subClassOf": "schema:LocalBusiness",
                     "description": "A travel agency."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:MedicalOrganization",
               "name": "MedicalOrganization",
               "rdfs:subClassOf": "schema:Organization",
               "description": "A medical organization (physical or not), such as hospital, institution or clinic.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Dentist",
                     "name": "Dentist",
                     "rdfs:subClassOf": [
                        "schema:LocalBusiness",
                        "schema:MedicalBusiness",
                        "schema:MedicalOrganization"
                     ],
                     "description": "A dentist."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DiagnosticLab",
                     "name": "DiagnosticLab",
                     "rdfs:subClassOf": "schema:MedicalOrganization",
                     "description": "A medical laboratory that offers on-site or off-site diagnostic services."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Hospital",
                     "name": "Hospital",
                     "rdfs:subClassOf": [
                        "schema:CivicStructure",
                        "schema:EmergencyService",
                        "schema:MedicalOrganization"
                     ],
                     "description": "A hospital."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MedicalClinic",
                     "name": "MedicalClinic",
                     "rdfs:subClassOf": [
                        "schema:MedicalBusiness",
                        "schema:MedicalOrganization"
                     ],
                     "description": "A facility, often associated with a hospital or medical school, that is devoted to the specific diagnosis and/or healthcare. Previously limited to outpatients but with evolution it may be open to inpatients as well."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Pharmacy",
                     "name": "Pharmacy",
                     "rdfs:subClassOf": [
                        "schema:MedicalBusiness",
                        "schema:MedicalOrganization"
                     ],
                     "description": "A pharmacy or drugstore."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Physician",
                     "name": "Physician",
                     "rdfs:subClassOf": [
                        "schema:MedicalBusiness",
                        "schema:MedicalOrganization"
                     ],
                     "description": "A doctor's office."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:VeterinaryCare",
                     "name": "VeterinaryCare",
                     "rdfs:subClassOf": "schema:MedicalOrganization",
                     "description": "A vet's office."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:NGO",
               "name": "NGO",
               "rdfs:subClassOf": "schema:Organization",
               "description": "Organization: Non-governmental Organization."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:NewsMediaOrganization",
               "name": "NewsMediaOrganization",
               "rdfs:subClassOf": "schema:Organization",
               "description": "A News/Media organization such as a newspaper or TV station.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:PerformingGroup",
               "name": "PerformingGroup",
               "rdfs:subClassOf": "schema:Organization",
               "description": "A performance group, such as a band, an orchestra, or a circus.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:DanceGroup",
                     "name": "DanceGroup",
                     "rdfs:subClassOf": "schema:PerformingGroup",
                     "description": "A dance group&#x2014;for example, the Alvin Ailey Dance Theater or Riverdance."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MusicGroup",
                     "name": "MusicGroup",
                     "rdfs:subClassOf": "schema:PerformingGroup",
                     "description": "A musical group, such as a band, an orchestra, or a choir. Can also be a solo musician."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TheaterGroup",
                     "name": "TheaterGroup",
                     "rdfs:subClassOf": "schema:PerformingGroup",
                     "description": "A theater group or company, for example, the Royal Shakespeare Company or Druid Theatre."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Project",
               "name": "Project",
               "rdfs:subClassOf": "schema:Organization",
               "description": "An enterprise (potentially individual but typically collaborative), planned to achieve a particular aim.\nUse properties from Organization, subOrganization/parentOrganization to indicate project sub-structures.",
               "pending": true,
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:FundingAgency",
                     "name": "FundingAgency",
                     "rdfs:subClassOf": "schema:Project",
                     "description": "A FundingAgency is an organization that implements one or more FundingSchemes and manages\n    the granting process (via Grants, typically MonetaryGrants).\n    A funding agency is not always required for grant funding, e.g. philanthropic giving, corporate sponsorship etc...",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ResearchProject",
                     "name": "ResearchProject",
                     "rdfs:subClassOf": "schema:Project",
                     "description": "A Research project.",
                     "pending": true
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ResearchOrganization",
               "name": "ResearchOrganization",
               "rdfs:subClassOf": "schema:Organization",
               "description": "A Research Organization (e.g. scientific institute, research company).",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:SportsOrganization",
               "name": "SportsOrganization",
               "rdfs:subClassOf": "schema:Organization",
               "description": "Represents the collection of all sports organizations, including sports teams, governing bodies, and sports associations.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:SportsTeam",
                     "name": "SportsTeam",
                     "rdfs:subClassOf": "schema:SportsOrganization",
                     "description": "Organization: Sports team."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:WorkersUnion",
               "name": "WorkersUnion",
               "rdfs:subClassOf": "schema:Organization",
               "description": "A Workers Union (also known as a Labor Union, Labour Union, or Trade Union) is an organization that promotes the interests of its worker members by collectively bargaining with management, organizing, and political lobbying."
            }
         ]
      },
      {
         "@type": "rdfs:Class",
         "@id": "schema:Person",
         "name": "Person",
         "rdfs:subClassOf": "schema:Thing",
         "description": "A person (alive, dead, undead, or fictional).",
         "children": [
            {
               "@type": "rdfs:Class",
               "@id": "schema:Patient",
               "name": "Patient",
               "rdfs:subClassOf": [
                  "schema:MedicalAudience",
                  "schema:Person"
               ],
               "description": "A patient is any person recipient of health care services."
            }
         ]
      },
      {
         "@type": "rdfs:Class",
         "@id": "schema:Place",
         "name": "Place",
         "rdfs:subClassOf": "schema:Thing",
         "description": "Entities that have a somewhat fixed, physical extension.",
         "children": [
            {
               "@type": "rdfs:Class",
               "@id": "schema:Accommodation",
               "name": "Accommodation",
               "rdfs:subClassOf": "schema:Place",
               "description": "An accommodation is a place that can accommodate human beings, e.g. a hotel room, a camping pitch, or a meeting room. Many accommodations are for overnight stays, but this is not a mandatory requirement.\nFor more specific types of accommodations not defined in schema...",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Apartment",
                     "name": "Apartment",
                     "rdfs:subClassOf": "schema:Accommodation",
                     "description": "An apartment (in American English) or flat (in British English) is a self-contained housing unit (a type of residential real estate) that occupies only part of a building (Source: Wikipedia, the free encyclopedia, see http://en.wikipedia.org/wiki/Apartment)."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:CampingPitch",
                     "name": "CampingPitch",
                     "rdfs:subClassOf": "schema:Accommodation",
                     "description": "A CampingPitch is an individual place for overnight stay in the outdoors, typically being part of a larger camping site, or Campground.\n\nIn British English a campsite, or campground, is an area, usually divided into a number of pitches, where people can camp overnight using tents or camper vans or caravans; this British English use of the word is synonymous with the American English expression campground..."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:House",
                     "name": "House",
                     "rdfs:subClassOf": "schema:Accommodation",
                     "description": "A house is a building or structure that has the ability to be occupied for habitation by humans or other creatures (Source: Wikipedia, the free encyclopedia, see http://en.wikipedia.org/wiki/House).",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:SingleFamilyResidence",
                           "name": "SingleFamilyResidence",
                           "rdfs:subClassOf": "schema:House",
                           "description": "Residence type: Single-family home."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Room",
                     "name": "Room",
                     "rdfs:subClassOf": "schema:Accommodation",
                     "description": "A room is a distinguishable space within a structure, usually separated from other spaces by interior walls. (Source: Wikipedia, the free encyclopedia, see http://en.wikipedia.org/wiki/Room).\n\nSee also the dedicated document on the use of schema.org for marking up hotels and other forms of accommodations.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:HotelRoom",
                           "name": "HotelRoom",
                           "rdfs:subClassOf": "schema:Room",
                           "description": "A hotel room is a single room in a hotel.\n\nSee also the dedicated document on the use of schema.org for marking up hotels and other forms of accommodations."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:MeetingRoom",
                           "name": "MeetingRoom",
                           "rdfs:subClassOf": "schema:Room",
                           "description": "A meeting room, conference room, or conference hall is a room provided for singular events such as business conferences and meetings (Source: Wikipedia, the free encyclopedia, see http://en.wikipedia.org/wiki/Conference_hall).\n\nSee also the dedicated document on the use of schema..."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Suite",
                     "name": "Suite",
                     "rdfs:subClassOf": "schema:Accommodation",
                     "description": "A suite in a hotel or other public accommodation, denotes a class of luxury accommodations, the key feature of which is multiple rooms (Source: Wikipedia, the free encyclopedia, see http://en.wikipedia.org/wiki/Suite_(hotel)).\n\nSee also the dedicated document on the use of schema..."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:AdministrativeArea",
               "name": "AdministrativeArea",
               "rdfs:subClassOf": "schema:Place",
               "description": "A geographical region, typically under the jurisdiction of a particular government.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:City",
                     "name": "City",
                     "rdfs:subClassOf": "schema:AdministrativeArea",
                     "description": "A city or town."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Country",
                     "name": "Country",
                     "rdfs:subClassOf": "schema:AdministrativeArea",
                     "description": "A country."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:SchoolDistrict",
                     "name": "SchoolDistrict",
                     "rdfs:subClassOf": "schema:AdministrativeArea",
                     "description": "A School District is an administrative area for the administration of schools.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:State",
                     "name": "State",
                     "rdfs:subClassOf": "schema:AdministrativeArea",
                     "description": "A state or province of a country."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:CivicStructure",
               "name": "CivicStructure",
               "rdfs:subClassOf": "schema:Place",
               "description": "A public structure, such as a town hall or concert hall.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Airport",
                     "name": "Airport",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "An airport."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Aquarium",
                     "name": "Aquarium",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "Aquarium."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Beach",
                     "name": "Beach",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "Beach."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BoatTerminal",
                     "name": "BoatTerminal",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A terminal for boats, ships, and other water vessels.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Bridge",
                     "name": "Bridge",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A bridge."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BusStation",
                     "name": "BusStation",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A bus station."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BusStop",
                     "name": "BusStop",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A bus stop."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Campground",
                     "name": "Campground",
                     "rdfs:subClassOf": [
                        "schema:CivicStructure",
                        "schema:LodgingBusiness"
                     ],
                     "description": "A camping site, campsite, or Campground is a place used for overnight stay in the outdoors, typically containing individual CampingPitch locations. \n\nIn British English a campsite is an area, usually divided into a number of pitches, where people can camp overnight using tents or camper vans or caravans; this British English use of the word is synonymous with the American English expression campground..."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Cemetery",
                     "name": "Cemetery",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A graveyard."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Crematorium",
                     "name": "Crematorium",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A crematorium."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:EducationalOrganization",
                     "name": "EducationalOrganization",
                     "rdfs:subClassOf": [
                        "schema:CivicStructure",
                        "schema:Organization"
                     ],
                     "description": "An educational organization."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:EventVenue",
                     "name": "EventVenue",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "An event venue."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:FireStation",
                     "name": "FireStation",
                     "rdfs:subClassOf": [
                        "schema:CivicStructure",
                        "schema:EmergencyService"
                     ],
                     "description": "A fire station. With firemen."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:GovernmentBuilding",
                     "name": "GovernmentBuilding",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A government building.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:CityHall",
                           "name": "CityHall",
                           "rdfs:subClassOf": "schema:GovernmentBuilding",
                           "description": "A city hall."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Courthouse",
                           "name": "Courthouse",
                           "rdfs:subClassOf": "schema:GovernmentBuilding",
                           "description": "A courthouse."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:DefenceEstablishment",
                           "name": "DefenceEstablishment",
                           "rdfs:subClassOf": "schema:GovernmentBuilding",
                           "description": "A defence establishment, such as an army or navy base."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Embassy",
                           "name": "Embassy",
                           "rdfs:subClassOf": "schema:GovernmentBuilding",
                           "description": "An embassy."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:LegislativeBuilding",
                           "name": "LegislativeBuilding",
                           "rdfs:subClassOf": "schema:GovernmentBuilding",
                           "description": "A legislative building&#x2014;for example, the state capitol."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Hospital",
                     "name": "Hospital",
                     "rdfs:subClassOf": [
                        "schema:CivicStructure",
                        "schema:EmergencyService",
                        "schema:MedicalOrganization"
                     ],
                     "description": "A hospital."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MovieTheater",
                     "name": "MovieTheater",
                     "rdfs:subClassOf": [
                        "schema:CivicStructure",
                        "schema:EntertainmentBusiness"
                     ],
                     "description": "A movie theater."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Museum",
                     "name": "Museum",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A museum."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MusicVenue",
                     "name": "MusicVenue",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A music venue."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Park",
                     "name": "Park",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A park."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ParkingFacility",
                     "name": "ParkingFacility",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A parking lot or other parking facility."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PerformingArtsTheater",
                     "name": "PerformingArtsTheater",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A theater or other performing art center."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PlaceOfWorship",
                     "name": "PlaceOfWorship",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "Place of worship, such as a church, synagogue, or mosque.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:BuddhistTemple",
                           "name": "BuddhistTemple",
                           "rdfs:subClassOf": "schema:PlaceOfWorship",
                           "description": "A Buddhist temple."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Church",
                           "name": "Church",
                           "rdfs:subClassOf": "schema:PlaceOfWorship",
                           "description": "A church.",
                           "children": [
                              {
                                 "@type": "rdfs:Class",
                                 "@id": "schema:CatholicChurch",
                                 "name": "CatholicChurch",
                                 "rdfs:subClassOf": "schema:Church",
                                 "description": "A Catholic church."
                              }
                           ]
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:HinduTemple",
                           "name": "HinduTemple",
                           "rdfs:subClassOf": "schema:PlaceOfWorship",
                           "description": "A Hindu temple."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Mosque",
                           "name": "Mosque",
                           "rdfs:subClassOf": "schema:PlaceOfWorship",
                           "description": "A mosque."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Synagogue",
                           "name": "Synagogue",
                           "rdfs:subClassOf": "schema:PlaceOfWorship",
                           "description": "A synagogue."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Playground",
                     "name": "Playground",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A playground."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PoliceStation",
                     "name": "PoliceStation",
                     "rdfs:subClassOf": [
                        "schema:CivicStructure",
                        "schema:EmergencyService"
                     ],
                     "description": "A police station."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:PublicToilet",
                     "name": "PublicToilet",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A public toilet is a room or small building containing one or more toilets (and possibly also urinals) which is available for use by the general public, or by customers or employees of certain businesses.",
                     "pending": true
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:RVPark",
                     "name": "RVPark",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A place offering space for \"Recreational Vehicles\", Caravans, mobile homes and the like."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:StadiumOrArena",
                     "name": "StadiumOrArena",
                     "rdfs:subClassOf": [
                        "schema:CivicStructure",
                        "schema:SportsActivityLocation"
                     ],
                     "description": "A stadium."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:SubwayStation",
                     "name": "SubwayStation",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A subway station."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TaxiStand",
                     "name": "TaxiStand",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A taxi stand."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:TrainStation",
                     "name": "TrainStation",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A train station."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Zoo",
                     "name": "Zoo",
                     "rdfs:subClassOf": "schema:CivicStructure",
                     "description": "A zoo."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Landform",
               "name": "Landform",
               "rdfs:subClassOf": "schema:Place",
               "description": "A landform or physical feature.  Landform elements include mountains, plains, lakes, rivers, seascape and oceanic waterbody interface features such as bays, peninsulas, seas and so forth, including sub-aqueous terrain features such as submersed mountain ranges, volcanoes, and the great ocean basins.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BodyOfWater",
                     "name": "BodyOfWater",
                     "rdfs:subClassOf": "schema:Landform",
                     "description": "A body of water, such as a sea, ocean, or lake.",
                     "children": [
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Canal",
                           "name": "Canal",
                           "rdfs:subClassOf": "schema:BodyOfWater",
                           "description": "A canal, like the Panama Canal."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:LakeBodyOfWater",
                           "name": "LakeBodyOfWater",
                           "rdfs:subClassOf": "schema:BodyOfWater",
                           "description": "A lake (for example, Lake Pontrachain)."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:OceanBodyOfWater",
                           "name": "OceanBodyOfWater",
                           "rdfs:subClassOf": "schema:BodyOfWater",
                           "description": "An ocean (for example, the Pacific)."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Pond",
                           "name": "Pond",
                           "rdfs:subClassOf": "schema:BodyOfWater",
                           "description": "A pond."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Reservoir",
                           "name": "Reservoir",
                           "rdfs:subClassOf": "schema:BodyOfWater",
                           "description": "A reservoir of water, typically an artificially created lake, like the Lake Kariba reservoir."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:RiverBodyOfWater",
                           "name": "RiverBodyOfWater",
                           "rdfs:subClassOf": "schema:BodyOfWater",
                           "description": "A river (for example, the broad majestic Shannon)."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:SeaBodyOfWater",
                           "name": "SeaBodyOfWater",
                           "rdfs:subClassOf": "schema:BodyOfWater",
                           "description": "A sea (for example, the Caspian sea)."
                        },
                        {
                           "@type": "rdfs:Class",
                           "@id": "schema:Waterfall",
                           "name": "Waterfall",
                           "rdfs:subClassOf": "schema:BodyOfWater",
                           "description": "A waterfall, like Niagara."
                        }
                     ]
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Continent",
                     "name": "Continent",
                     "rdfs:subClassOf": "schema:Landform",
                     "description": "One of the continents (for example, Europe or Africa)."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Mountain",
                     "name": "Mountain",
                     "rdfs:subClassOf": "schema:Landform",
                     "description": "A mountain, like Mount Whitney or Mount Everest."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Volcano",
                     "name": "Volcano",
                     "rdfs:subClassOf": "schema:Landform",
                     "description": "A volcano, like Fuji san."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:LandmarksOrHistoricalBuildings",
               "name": "LandmarksOrHistoricalBuildings",
               "rdfs:subClassOf": "schema:Place",
               "description": "An historical landmark or building."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:LocalBusiness",
               "name": "LocalBusiness",
               "rdfs:subClassOf": [
                  "schema:Organization",
                  "schema:Place"
               ],
               "description": "A particular physical business or branch of an organization. Examples of LocalBusiness include a restaurant, a particular branch of a restaurant chain, a branch of a bank, a medical practice, a club, a bowling alley, etc."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Residence",
               "name": "Residence",
               "rdfs:subClassOf": "schema:Place",
               "description": "The place where a person lives.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:ApartmentComplex",
                     "name": "ApartmentComplex",
                     "rdfs:subClassOf": "schema:Residence",
                     "description": "Residence type: Apartment complex."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:GatedResidenceCommunity",
                     "name": "GatedResidenceCommunity",
                     "rdfs:subClassOf": "schema:Residence",
                     "description": "Residence type: Gated community."
                  }
               ]
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:TouristAttraction",
               "name": "TouristAttraction",
               "rdfs:subClassOf": "schema:Place",
               "description": "A tourist attraction.  In principle any Thing can be a TouristAttraction, from a Mountain and LandmarksOrHistoricalBuildings to a LocalBusiness.  This Type can be used on its own to describe a general TouristAttraction, or be used as an additionalType to add tourist attraction properties to any other type..."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:TouristDestination",
               "name": "TouristDestination",
               "rdfs:subClassOf": "schema:Place",
               "description": "A tourist destination. In principle any Place can be a TouristDestination from a City, Region or Country to an AmusementPark or Hotel. This Type can be used on its own to describe a general TouristDestination, or be used as an additionalType to add tourist relevant properties to any other Place...",
               "pending": true
            }
         ]
      },
      {
         "@type": "rdfs:Class",
         "@id": "schema:Product",
         "name": "Product",
         "rdfs:subClassOf": "schema:Thing",
         "description": "Any offered product or service. For example: a pair of shoes; a concert ticket; the rental of a car; a haircut; or an episode of a TV show streamed online.",
         "children": [
            {
               "@type": "rdfs:Class",
               "@id": "schema:IndividualProduct",
               "name": "IndividualProduct",
               "rdfs:subClassOf": "schema:Product",
               "description": "A single, identifiable product instance (e.g. a laptop with a particular serial number)."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ProductCollection",
               "name": "ProductCollection",
               "rdfs:subClassOf": [
                  "schema:Collection",
                  "schema:Product"
               ],
               "description": "A set of products (either ProductGroups or specific variants) that are listed together e.g. in an Offer.",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ProductGroup",
               "name": "ProductGroup",
               "rdfs:subClassOf": "schema:Product",
               "description": "A ProductGroup represents a group of Products that vary only in certain well-described ways, such as by size, color, material etc.\n\nWhile a ProductGroup itself is not directly offered for sale, the various varying products that it represents can be. The ProductGroup serves as a prototype or template, standing in for all of the products who have an isVariantOf relationship to it...",
               "pending": true
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:ProductModel",
               "name": "ProductModel",
               "rdfs:subClassOf": "schema:Product",
               "description": "A datasheet or vendor specification of a product (in the sense of a prototypical description)."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:SomeProducts",
               "name": "SomeProducts",
               "rdfs:subClassOf": "schema:Product",
               "description": "A placeholder for multiple similar products of the same kind."
            },
            {
               "@type": "rdfs:Class",
               "@id": "schema:Vehicle",
               "name": "Vehicle",
               "rdfs:subClassOf": "schema:Product",
               "description": "A vehicle is a device that is designed or used to transport people or cargo over land, water, air, or through space.",
               "children": [
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:BusOrCoach",
                     "name": "BusOrCoach",
                     "rdfs:subClassOf": "schema:Vehicle",
                     "description": "A bus (also omnibus or autobus) is a road vehicle designed to carry passengers. Coaches are luxury busses, usually in service for long distance travel."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Car",
                     "name": "Car",
                     "rdfs:subClassOf": "schema:Vehicle",
                     "description": "A car is a wheeled, self-powered motor vehicle used for transportation."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:Motorcycle",
                     "name": "Motorcycle",
                     "rdfs:subClassOf": "schema:Vehicle",
                     "description": "A motorcycle or motorbike is a single-track, two-wheeled motor vehicle."
                  },
                  {
                     "@type": "rdfs:Class",
                     "@id": "schema:MotorizedBicycle",
                     "name": "MotorizedBicycle",
                     "rdfs:subClassOf": "schema:Vehicle",
                     "description": "A motorized bicycle is a bicycle with an attached motor used to power the vehicle, or to assist with pedaling."
                  }
               ]
            }
         ]
      },
      {
         "@type": "rdfs:Class",
         "@id": "schema:StupidType",
         "name": "StupidType",
         "rdfs:subClassOf": "schema:Thing",
         "description": "A StupidType for testing.",
         "attic": true
      },
      {
         "@type": "rdfs:Class",
         "@id": "schema:Taxon",
         "name": "Taxon",
         "rdfs:subClassOf": "schema:Thing",
         "description": "A set of organisms asserted to represent a natural cohesive biological unit.",
         "pending": true
      }
   ]
}
const transformChildren = (a) => {
  return a.map((c) => {
    return {
      id: c.name || null,
      children: !!c.children ? transformChildren(c.children) : []
    }
  }).filter((c) => !!c)
}
console.log(JSON.stringify(transformChildren(tree.children)));
