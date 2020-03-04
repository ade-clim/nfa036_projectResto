<?php

namespace App\Repository;

use App\Entity\OrderdetailsSupplements;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method OrderdetailsSupplements|null find($id, $lockMode = null, $lockVersion = null)
 * @method OrderdetailsSupplements|null findOneBy(array $criteria, array $orderBy = null)
 * @method OrderdetailsSupplements[]    findAll()
 * @method OrderdetailsSupplements[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OrderdetailsSupplementsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OrderdetailsSupplements::class);
    }

    // /**
    //  * @return OrderdetailsSupplements[] Returns an array of OrderdetailsSupplements objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('o.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?OrderdetailsSupplements
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
