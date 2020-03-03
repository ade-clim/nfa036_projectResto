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
        "get"
 *     },
 *     itemOperations={
 *         "get",
 *         "delete"={"security"="is_granted('ROLE_ADMIN')", "security_message"="Seul les admins peuvent supprimer un client."},
 *         "put"={"security"="is_granted('ROLE_ADMIN')"},
 *     },
 *     normalizationContext={"groups"={"supplement_read"}})
 * @ORM\Entity(repositoryClass="App\Repository\SupplementRepository")
 */
class Supplement
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"supplement_read", "category_read", "extraSupplement_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"supplement_read", "category_read"})
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"supplement_read", "category_read"})
     *
     */
    private $description;

    /**
     * @ORM\Column(type="float")
     * @Groups({"supplement_read", "category_read"})
     */
    private $price;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ExtraSupplement", mappedBy="supplement")
     */
    private $extraSupplements;

    public function __construct()
    {
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

    public function setDescription(?string $description): self
    {
        $this->description = $description;

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
            $extraSupplement->setSupplement($this);
        }

        return $this;
    }

    public function removeExtraSupplement(ExtraSupplement $extraSupplement): self
    {
        if ($this->extraSupplements->contains($extraSupplement)) {
            $this->extraSupplements->removeElement($extraSupplement);
            // set the owning side to null (unless already changed)
            if ($extraSupplement->getSupplement() === $this) {
                $extraSupplement->setSupplement(null);
            }
        }

        return $this;
    }
}
