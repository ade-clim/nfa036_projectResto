<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *     attributes={
 *     "order"= {"id"}},
 *     collectionOperations={
        "get"={"security"="is_granted('ROLE_ADMIN') or is_granted('ROLE_MANAGER')"}
 *     },
 *     itemOperations={
 *         "get",
 *         "delete"={"security"="is_granted('ROLE_ADMIN')", "security_message"="Seul les admins peuvent supprimer un client."},
 *         "put"={"security"="is_granted('ROLE_ADMIN')"},
 *     },
 *     normalizationContext={"groups"={"extras_read"}})
 * @ORM\Entity(repositoryClass="App\Repository\ExtraRepository")
 */
class Extra
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"extras_read","productExtra_read", "products_read", "extraSupplement_read", "category_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *@Groups({"extras_read","productExtra_read", "products_read","category_read", "extraSupplement_read"})
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"extras_read","productExtra_read", "products_read","category_read"})
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProductExtra", mappedBy="extra", cascade={"remove"})
     * @Groups({"extras_read"})
     */
    private $productExtras;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ExtraSupplement", mappedBy="extra")
     * @Groups({"extras_read", "category_read", "products_read", "productExtra_read"})
     */
    private $supplement;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ExtraSupplement", mappedBy="extra")
     * @Groups({"extras_read", "products_read", "productExtra_read"})
     */
    private $extraSupplements;

    public function __construct()
    {
        $this->productExtras = new ArrayCollection();
        $this->supplement = new ArrayCollection();
        $this->extraSupplements = new ArrayCollection();
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

    /**
     * @return Collection|ExtraSupplement[]
     */
    public function getSupplement(): Collection
    {
        return $this->supplement;
    }

    public function addSupplement(ExtraSupplement $supplement): self
    {
        if (!$this->supplement->contains($supplement)) {
            $this->supplement[] = $supplement;
            $supplement->setExtra($this);
        }

        return $this;
    }

    public function removeSupplement(ExtraSupplement $supplement): self
    {
        if ($this->supplement->contains($supplement)) {
            $this->supplement->removeElement($supplement);
            // set the owning side to null (unless already changed)
            if ($supplement->getExtra() === $this) {
                $supplement->setExtra(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|ExtraSupplement[]
     */
    public function getExtraSupplements(): Collection
    {
        return $this->extraSupplements;
    }

    public function addExtraSupplement(ExtraSupplement $extraSupplement): self
    {
        if (!$this->extraSupplements->contains($extraSupplement)) {
            $this->extraSupplements[] = $extraSupplement;
            $extraSupplement->setExtra($this);
        }

        return $this;
    }

    public function removeExtraSupplement(ExtraSupplement $extraSupplement): self
    {
        if ($this->extraSupplements->contains($extraSupplement)) {
            $this->extraSupplements->removeElement($extraSupplement);
            // set the owning side to null (unless already changed)
            if ($extraSupplement->getExtra() === $this) {
                $extraSupplement->setExtra(null);
            }
        }

        return $this;
    }

}
