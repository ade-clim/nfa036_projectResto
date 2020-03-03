<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\OrdersRepository")
 * @ApiResource(
 *     normalizationContext={"groups"={"order_read"}}
 * )
 */
class Orders
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"order_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"order_read"})
     */
    private $price;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"order_read"})
     */
    private $orderNumber;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="orders")
     * @Groups({"order_read"})
     * @Assert\NotBlank(message="L'utilisateur est obligatoire")
     */
    private $user;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\OrderDetail", mappedBy="orders")
     * @Groups({"order_read"})
     */
    private $orderDetails;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\AddressDelivery", inversedBy="orders")
     */
    private $addressDelivery;

    /**
     * @ORM\Column(type="date")
     * @Groups({"order_read"})
     */
    private $dateOrder;

    public function __construct()
    {
        $this->orderDetails = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getOrderNumber(): ?int
    {
        return $this->orderNumber;
    }

    public function setOrderNumber(int $orderNumber): self
    {
        $this->orderNumber = $orderNumber;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection|OrderDetail[]
     */
    public function getOrderDetails(): Collection
    {
        return $this->orderDetails;
    }

    public function addOrderDetail(OrderDetail $orderDetail): self
    {
        if (!$this->orderDetails->contains($orderDetail)) {
            $this->orderDetails[] = $orderDetail;
            $orderDetail->setOrders($this);
        }

        return $this;
    }

    public function removeOrderDetail(OrderDetail $orderDetail): self
    {
        if ($this->orderDetails->contains($orderDetail)) {
            $this->orderDetails->removeElement($orderDetail);
            // set the owning side to null (unless already changed)
            if ($orderDetail->getOrders() === $this) {
                $orderDetail->setOrders(null);
            }
        }

        return $this;
    }

    public function getAddressDelivery(): ?AddressDelivery
    {
        return $this->addressDelivery;
    }

    public function setAddressDelivery(?AddressDelivery $addressDelivery): self
    {
        $this->addressDelivery = $addressDelivery;

        return $this;
    }

    public function getDateOrder(): ?\DateTimeInterface
    {
        return $this->dateOrder;
    }

    public function setDateOrder(\DateTimeInterface $dateOrder): self
    {
        $this->dateOrder = $dateOrder;

        return $this;
    }

}
