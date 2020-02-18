<?php

namespace App\Repository;

use App\Entity\ExtraSupplement;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method ExtraSupplement|null find($id, $lockMode = null, $lockVersion = null)
 * @method ExtraSupplement|null findOneBy(array $criteria, array $orderBy = null)
 * @method ExtraSupplement[]    findAll()
 * @method ExtraSupplement[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExtraSupplementRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ExtraSupplement::class);
    }

    // /**
    //  * @return ExtraSupplement[] Returns an array of ExtraSupplement objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ExtraSupplement
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
