<?php

namespace App\DataFixtures;

use App\Entity\Address;
use App\Entity\Category;
use App\Entity\Extra;
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
                $produit->setTitle($faker->text($maxNbChars = 20))
                    ->setPrice(mt_rand(2, 12))
                    ->setDescription($faker->text($maxNbChars = 50))
                    ->setCategory($category); // ajoute le produit à la categorie

                $manager->persist($produit);

            }

            for ($i = 0; $i < 30; $i++) { // boucle de creation d'utilisateur

                $adresse = new Address();
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
                    ->setAddress($adresse);

                $manager->persist($client);
            }

        }

        // Création des extras

        $sauces = new Extra();
        $sauces->setTitle("Sauce")
            ->setDescription("Choissisez votre sauce");
        $manager->persist($sauces);

        $cuisson = new Extra();
        $cuisson->setTitle("Cuisson")
            ->setDescription("Choissisez votre cuisson");
        $manager->persist($cuisson);

        $supplements = new Extra();
        $supplements->setTitle("Suppléments")
            ->setDescription("Choissisez vos suppléments");
        $manager->persist($supplements);

        $viandes = new Extra();
        $viandes->setTitle("Viande")
            ->setDescription("Choissisez votre viande");
        $manager->persist($viandes);


        $manager->flush();
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


