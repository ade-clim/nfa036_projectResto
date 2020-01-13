<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(normalizationContext={"groups"={"extras_read"}})
 * @ORM\Entity(repositoryClass="App\Repository\ExtraRepository")
 */
class Extra
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"extras_read","productExtra_read", "products_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *@Groups({"extras_read","productExtra_read", "products_read"})
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"extras_read","productExtra_read", "products_read"})
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProductExtra", mappedBy="extra")
     *  @Groups({"extras_read"})
     */
    private $productExtras;

    public function __construct()
    {
        $this->productExtras = new ArrayCollection();
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection|ProductExtra[]
     */
    public function getProductExtras(): Collection
    {
        return $this->productExtras;
    }

    public function addProductExtra(ProductExtra $productExtra): self
    {
        if (!$this->productExtras->contains($productExtra)) {
            $this->productExtras[] = $productExtra;
            $productExtra->setExtra($this);
        }

        return $this;
    }

    public function removeProductExtra(ProductExtra $productExtra): self
    {
        if ($this->productExtras->contains($productExtra)) {
            $this->productExtras->removeElement($productExtra);
            // set the owning side to null (unless already changed)
            if ($productExtra->getExtra() === $this) {
                $productExtra->setExtra(null);
            }
        }

        return $this;
    }
}
