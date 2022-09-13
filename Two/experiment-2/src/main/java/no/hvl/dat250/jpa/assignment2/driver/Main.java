package no.hvl.dat250.jpa.assignment2.driver;

import no.hvl.dat250.jpa.assignment2.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;

public class Main {
    public static final String PERSISTENCE_UNIT_NAME = "experiment2";

    public static void main(String[] args) {
        EntityManagerFactory factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
        EntityManager em = factory.createEntityManager();

        em.getTransaction().begin();
        Person max = new Person();
        max.setName("Max Mustermann");



        Address maxAdress = new Address();
        maxAdress.setStreet("Inndalsveien");
        maxAdress.setNumber(28);

        CreditCard One = new CreditCard();
        One.setNumber(12345);
        One.setBalance(-5000);
        One.setLimit(-10000);

        CreditCard Two = new CreditCard();
        Two.setNumber(123);
        Two.setBalance(1);
        Two.setLimit(2000);

        Pincode pincode = new Pincode();
        pincode.setPincode("123");
        pincode.setCount(1);

        Bank pengebank = new Bank();

        pengebank.setName("Pengebank");


        /// Relations
        maxAdress.setOwners(new HashSet<>(Arrays.asList(max)));
        max.setAddresses(Arrays.asList(maxAdress));
        max.setCreditCards(Arrays.asList(One,Two));

        One.setPincode(pincode);
        Two.setPincode(pincode);
        pengebank.setOwnedCards( new HashSet<>(Arrays.asList(One,Two)));
        One.setOwningBank(pengebank);
        Two.setOwningBank(pengebank);

        em.persist(One);
        em.persist(Two);
        em.persist(pincode);
        em.persist(pengebank);
        em.persist(max);
        em.persist(maxAdress);


        em.getTransaction().commit();
        // TODO: Persist object world corresponding to the domain model of experiment 2.
    }
}
