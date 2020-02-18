<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\SupplementRepository")
 */
class Supplement
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="float")
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

    public function setPrice(float $price): self
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
