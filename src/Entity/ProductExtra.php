<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *     attributes={
 *     "order"= {"extra.id"}},
 *     normalizationContext={"groups"={"productExtra_read"}})
 * @ORM\Entity(repositoryClass="App\Repository\ProductExtraRepository")
 */
class ProductExtra
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"productExtra_read","products_read","extras_read","category_read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Extra", inversedBy="productExtras")
     * @Groups({"productExtra_read", "category_read", "products_read"})
     */
    private $extra;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Product", inversedBy="productExtras")
     * @Groups({"productExtra_read","extras_read"})
     */
    private $product;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getExtra(): ?Extra
    {
        return $this->extra;
    }

    public function setExtra(?Extra $extra): self
    {
        $this->extra = $extra;

        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }
}
