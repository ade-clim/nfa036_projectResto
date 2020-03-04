<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\OrderdetailsSupplementsRepository")
 */
class OrderdetailsSupplements
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\OrderDetail", inversedBy="orderdetailsSupplements")
     */
    private $orderDetail;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Supplement", inversedBy="orderdetailsSupplements")
     */
    private $supplement;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOrderDetail(): ?OrderDetail
    {
        return $this->orderDetail;
    }

    public function setOrderDetail(?OrderDetail $orderDetail): self
    {
        $this->orderDetail = $orderDetail;

        return $this;
    }

    public function getSupplement(): ?Supplement
    {
        return $this->supplement;
    }

    public function setSupplement(?Supplement $supplement): self
    {
        $this->supplement = $supplement;

        return $this;
    }
}
