package com.ssafy.greenEarth.controller;

import com.ssafy.greenEarth.dto.Member.ChildProfileDto;
import com.ssafy.greenEarth.dto.Game.MileageAddReqDto;
import com.ssafy.greenEarth.service.GameService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Api("GameController")
@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/game")
public class GameMileageController {

    private final GameService gameService;

    @ApiOperation(value = "게임 마일리지 적립", notes = "게임 마일리지를 적립한다.")
    @PutMapping("/success")
    public ResponseEntity<ChildProfileDto> updateMileage(@RequestBody MileageAddReqDto requestDto, HttpServletRequest request) {
        log.info("게임 마일리지 적립을 실행합니다. {}", requestDto);
        int curUserId = (int) request.getAttribute("curUserId");
        log.info("{}", curUserId);
        ChildProfileDto data = gameService.addMileage(curUserId, requestDto);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}
