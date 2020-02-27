<?php

namespace App\Repository;

use App\Entity\AddressDelivery;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method AddressDelivery|null find($id, $lockMode = null, $lockVersion = null)
 * @method AddressDelivery|null findOneBy(array $criteria, array $orderBy = null)
 * @method AddressDelivery[]    findAll()
 * @method AddressDelivery[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AddressDeliveryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AddressDelivery::class);
    }

    // /**
    //  * @return AddressDelivery[] Returns an array of AddressDelivery objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?AddressDelivery
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
