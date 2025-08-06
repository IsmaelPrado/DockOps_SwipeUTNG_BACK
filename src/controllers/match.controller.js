const { Match, User } = require("../models");
const { Op } = require("sequelize");

const getMutualMatches = async (req, res) => {
  const userId = req.userId;

  console.log("userId recibido en getMutualMatches:", userId);

  try {
    const matches = await Match.findAll({
      where: {
        [Op.or]: [{ user_id: userId }, { matched_user_id: userId }],
      },
      include: [
        {
          model: User,
          as: "matchedUser",
          attributes: ["id", "name", "email", "career", "age", "gender", "photos"],
        },
      ],
    });

    console.log(
      "📦 Matches encontrados en DB:",
      JSON.stringify(matches, null, 2)
    );

    const mutualMatches = await Promise.all(
      matches.map(async (match) => {
        let matchedUser;

        if (parseInt(match.user_id) === parseInt(userId)) {
          matchedUser = match.matchedUser;
        } else {
          matchedUser = await User.findByPk(match.user_id, {
            attributes: ["id", "name", "email", "career", "age", "gender", "photos"],
          });
        }

        const firstPhoto = matchedUser.photos?.[0] || null;

        return {
          matchId: match.id, // aquí agregas el ID del match
          user: {
            id: matchedUser.id,
            name: matchedUser.name,
            email: matchedUser.email,
            career: matchedUser.career,
            age: matchedUser.age,
            gender: matchedUser.gender,
            photos: firstPhoto
          }, // info del otro usuario
        };
      })
    );

    console.log("✅ Matches mutuos procesados:", mutualMatches);

    res.status(200).json({
      success: true,
      message:
        mutualMatches.length > 0
          ? "Matches mutuos encontrados"
          : "No tienes matches aún",
      data: mutualMatches,
    });
  } catch (error) {
    console.error("Error en getMutualMatches:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los matches mutuos",
      data: null,
    });
  }
};

module.exports = { getMutualMatches };
