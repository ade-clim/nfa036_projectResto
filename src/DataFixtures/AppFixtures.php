<?php

namespace App\DataFixtures;

use App\Entity\Adress;
use App\Entity\Category;
use App\Entity\Orders;
use App\Entity\Product;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;
    public function __construct(UserPasswordEncoderInterface $encoder){
        $this->encoder = $encoder;
    }
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');
        $orderNumberCpt = 1;

        for ($c = 0; $c < 5; $c++) { // boucle de creation de categories
            $category = new Category();
            $category->setTitle($faker->word);

            $manager->persist($category);
            for ($p = 0; $p < 5; $p++) { // boucle de creation de produit
                $produit = new Product();
                $produit->setTitle($faker->sentence($nbWords = 3, $variableNbWords = true))
                    ->setPrice(mt_rand(2, 12))
                    ->setDescription($faker->text($maxNbChars = 200))
                    ->setCategory($category); // ajoute le produit à la categorie

                $manager->persist($produit);

            }


            for ($i = 0; $i < 30; $i++) { // boucle de creation d'utilisateur

                $adresse = new Adress();
                $adresse->setStreet($faker->streetName)
                    ->setNumber($faker->buildingNumber)
                    ->setPostalCode($faker->postcode)
                    ->setCity($faker->city);

                //$manager->persist($adresse);


                $client = new User();
                $hash = $this->encoder->encodePassword($client, "password");
                $client->setFirstName($faker->firstName)
                    ->setLastName($faker->lastName)
                    ->setPassword($hash)
                    ->setPhone($faker->phoneNumber)
                    ->setEmail($faker->email)
                    ->setAdress($adresse);

                $manager->persist($client);
            }
            $manager->flush();
        }
    }
}
           /* for ($c = 0; $c < mt_rand(1,8); $c++){ // boucle creation aleatoire de commande pour chaque client
                $commande = new Orders();
                $commande->setOrderNumber($orderNumberCpt)
                    ->setPrice(mt_rand(5,19))
                    ->setUser($client);

                $manager->persist($commande);
                $orderNumberCpt++;
            } */


