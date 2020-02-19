<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(normalizationContext={"groups"={"extraSupplement_read"}})
 * @ORM\Entity(repositoryClass="App\Repository\ExtraSupplementRepository")
 */
class ExtraSupplement
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"extraSupplement_read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Extra", inversedBy="extraSupplements")
     * @Groups({"extraSupplement_read"})
     */
    private $extra;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Supplement", inversedBy="extraSupplements")
     * @Groups({"extraSupplement_read"})
     */
    private $supplement;


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
