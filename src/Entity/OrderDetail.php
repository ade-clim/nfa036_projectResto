<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\OrderDetailRepository")
 * @ApiResource(
 *     normalizationContext={"groups"={"orderDetails_read"}}
 *
 * )
 */
class OrderDetail
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"orderDetails_read","order_read","orderDetailsSupplements_read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Product", inversedBy="orderDetails")
     * @Groups({"orderDetails_read","order_read"})
     */
    private $products;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Orders", inversedBy="orderDetails")
     * @Groups({"orderDetails_read"})
     */
    private $orders;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"orderDetails_read","order_read"})
     */
    private $quantity;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\OrderdetailsSupplements", mappedBy="orderDetail")
     * @Groups({"orderDetails_read","order_read"})
     */
    private $orderdetailsSupplements;

    public function __construct()
    {
        $this->orderdetailsSupplements = new ArrayCollection();
    }


    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id): void
    {
        $this->id = $id;
    }

    public function getProducts(): ?Product
    {
        return $this->products;
    }

    public function setProducts(?Product $products): self
    {
        $this->products = $products;

        return $this;
    }

    public function getOrders(): ?Orders
    {
        return $this->orders;
    }

    public function setOrders(?Orders $orders): self
    {
        $this->orders = $orders;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    /**
     * @return Collection|OrderdetailsSupplements[]
     */
    public function getOrderdetailsSupplements(): Collection
    {
        return $this->orderdetailsSupplements;
    }

    public function addOrderdetailsSupplement(OrderdetailsSupplements $orderdetailsSupplement): self
    {
        if (!$this->orderdetailsSupplements->contains($orderdetailsSupplement)) {
            $this->orderdetailsSupplements[] = $orderdetailsSupplement;
            $orderdetailsSupplement->setOrderDetail($this);
        }

        return $this;
    }

    public function removeOrderdetailsSupplement(OrderdetailsSupplements $orderdetailsSupplement): self
    {
        if ($this->orderdetailsSupplements->contains($orderdetailsSupplement)) {
            $this->orderdetailsSupplements->removeElement($orderdetailsSupplement);
            // set the owning side to null (unless already changed)
            if ($orderdetailsSupplement->getOrderDetail() === $this) {
                $orderdetailsSupplement->setOrderDetail(null);
            }
        }

        return $this;
    }

}
