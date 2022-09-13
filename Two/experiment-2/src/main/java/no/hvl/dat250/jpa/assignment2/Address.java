package no.hvl.dat250.jpa.assignment2;

import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Setter
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String street;

    private int number;

    @ManyToMany(mappedBy = "addresses")
    private Set<Person> owners;

    public String getStreet() {
        // TODO: implement method!
        return street;
    }

    public Integer getNumber() {
        // TODO: implement method!
        return number;
    }

    public Set<Person> getOwners() {
        // TODO: implement method!
        return owners;
    }
}
