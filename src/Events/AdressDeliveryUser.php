<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\AddressDelivery;
use App\Entity\Orders;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class AdressDeliveryUser implements EventSubscriberInterface{

    /**
     * @var Security
     */
    private $security;


    public function __construct(Security $security)
    {
        $this->security = $security;

    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForAdressDelivery', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForAdressDelivery(ViewEvent $event){
        $adressDelivery = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();


        if ($adressDelivery instanceof AddressDelivery && $method === "POST"){

            // recup l'utilisateur actuellement connecté
            $user = $this->security->getUser();

            // assigner l'utilisateur à l'adresse de livraison qu'on est en train de créer
            $adressDelivery->setUser($user);
        }




    }
}