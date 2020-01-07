<?php

namespace App\Events;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Orders;
use App\Repository\OrdersRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;


class OrderChronoSubscriber implements EventSubscriberInterface{

    /**
     * @var Security
     */
    private $security;
    private $repository;

    public function __construct(Security $security, OrdersRepository $repository)
    {
        $this->security = $security;
        $this->repository = $repository;
    }

    public static function getSubscribedEvents()

    {
        return [
            KernelEvents::VIEW => ['setChronoForOrder',EventPriorities::PRE_VALIDATE]
        ];

    }

    public function setChronoForOrder(ViewEvent $event){

        // trouver l'utilisateur connecté (Security)
        $user = $this->security->getUser();



        $order = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if($order instanceof Orders && $method === "POST"){

            // recup le dernier chrono et appeler la methode findNextChrono pour incrementer
            $nextChrono = $this->repository->findNextChrono();
            $order->setOrderNumber($nextChrono);

            //ajout de la date dans la commande
            //if(empty($order->getSentAt())){
               // $order->setSentAt(new \DateTime());
            //}

        }
    }
}