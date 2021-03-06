package com.ssafy.db.repository;

import com.ssafy.db.entity.Conference;
import com.ssafy.db.entity.Folder;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConferenceRepository extends JpaRepository<Conference, Long> {
        Conference findByRoom(Room room);
}