<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProductRepository")
 * @ApiResource(
 *     attributes={
 *     "order"= {"id":"desc"},
 *     "security"="is_granted('ROLE_ADMIN')"},
 *     itemOperations={
        "get"
 *     },
 *     normalizationContext={"groups"={"products_read"}},
 *     denormalizationContext={"disable_type_enforcement"= true},
 * )
 * @ApiFilter(SearchFilter::class, properties={"title":"partial", "category.title":"partial"})
 */
class Product
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"products_read", "category_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"products_read", "category_read"})
     * @Assert\NotBlank(message="la dscription du produit doit etre renseigné")
     */
    private $title;

    /**
     * @ORM\Column(type="float")
     * @Groups({"products_read", "category_read"})
     * @Assert\NotBlank(message="montant obligatoire")
     * @Assert\Type(type="numeric", message="le montant du produit doit être numérique")
     */
    private $price;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"products_read", "category_read"})
     * @Assert\Length(min=3, minMessage="La description doit faire entre 3 et 50 caracteres", max=50, maxMessage="doit faire moins de 50 caracteres")
     * @Assert\NotBlank(message="la dscription du produit doit etre renseigné")
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Category", inversedBy="products")
     * @Groups({"products_read"})
     */
    private $category;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\OrderDetail", mappedBy="products")
     */
    private $orderDetails;

    public function __construct()
    {
        $this->orderDetails = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice($price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

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
            $orderDetail->setProducts($this);
        }

        return $this;
    }

    public function removeOrderDetail(OrderDetail $orderDetail): self
    {
        if ($this->orderDetails->contains($orderDetail)) {
            $this->orderDetails->removeElement($orderDetail);
            // set the owning side to null (unless already changed)
            if ($orderDetail->getProducts() === $this) {
                $orderDetail->setProducts(null);
            }
        }

        return $this;
    }
}
